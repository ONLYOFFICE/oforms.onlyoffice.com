import fs from "fs";
import formidable from "formidable";
import axios from "axios";
import jwt from "jsonwebtoken";
import S3 from "aws-sdk/clients/s3";
import zlib from "zlib";
import CONFIG from "@config/config";
import languages from "@config/languages.json";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      const formName = fields.formName === undefined ? "" : fields.formName[0];
      const language = fields.language === undefined ? "" : fields.language[0];
      const fileName = files.file[0].originalFilename;
      const uniqueFileName = `${Date.now()}_${fileName}`;
      const fileSize = files.file[0].size;
      const fileType = fileName?.match(/\.(\w+)$/)?.[1];
      const CMSConfigAPI = CONFIG.api.cms.replace("dashboard", "");
      const hasLanguage = languages.some(item => item.shortKey === language);
      const currentLanguage = hasLanguage ? language === "en" ? "" : `${language}/` : "";

      // Generate a unique key for payload
      const generateKey = () => {
        let key = "";
        const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 12; i++) {
          key += str.charAt(Math.floor(Math.random() * str.length));
        }
        return key;
      };

      // Data for Amazon S3
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_REGION,
      });

      // Amazon S3 params
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: uniqueFileName,
        Body: fs.createReadStream(files.file[0].filepath)
      };

      // Get response from Amazon S3
      const s3Response = await s3.upload(params).promise();
      const s3Url = `https://${s3Response.Bucket}/${s3Response.key}`;

      // Payload data
      const templatePreviewPayload = {
        "filetype": fileType,
        "key": generateKey(),
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 1448,
          "width": 1024
        },
        "title": uniqueFileName,
        "url": s3Url
      };

      const pdfPayload = {
        "filetype": fileType,
        "key": generateKey(),
        "outputtype": "pdf",
        "title": uniqueFileName,
        "url": s3Url
      };

      const filePayload = {
        "filetype": fileType,
        "key": generateKey(),
        "outputtype": fileType,
        "title": uniqueFileName,
        "url": s3Url
      };

      // Generate tokens for AuthorizationJwt
      const templatePreviewToken = jwt.sign(templatePreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const pdfToken = jwt.sign(pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const fileToken = jwt.sign(filePayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      // Send request to ConvertService and get result
      const templatePreviewRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, templatePreviewPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${templatePreviewToken}`
        }
      });

      const pdfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, pdfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${pdfToken}`
        }
      });

      const fileRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, filePayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${fileToken}`
        }
      });

      // Number of pages in PDF
      const response = await axios.get(pdfRequest.data.fileUrl, { responseType: "arraybuffer" });
      const pdfContent = Buffer.from(response.data).toString("utf-8");
      const matches = pdfContent.match(/\/Count\s+(\d+)/g);
  
      const lastMatch = matches[matches.length - 1];
      const pageCount = parseInt(lastMatch.match(/\d+/)[0]);

      // Delete temporary file
      fs.promises.unlink(files.file[0].filepath);

      // Delete file in Amazon S3
      await s3.deleteObject({
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: uniqueFileName
      }).promise();

      const compressedData = zlib.deflateSync(`${templatePreviewRequest.data.fileUrl};${pageCount};${fileName};${fileSize};${formName};${fileRequest.data.fileUrl}`);
      const compressedString = compressedData.toString("base64");

      return res.status(200).send(`${CMSConfigAPI}${`${currentLanguage}`}form-submit?index=${compressedString}`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};