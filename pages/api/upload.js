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
      const fileName = `${Date.now()}_${files.file[0].originalFilename}`;
      const fileNameSubstring = files.file[0].originalFilename.substring(0, files.file[0].originalFilename.length - 6);
      const CMSConfigAPI = CONFIG.api.cms.replace("dashboard", "");
      const hasLanguage = languages.some(item => item.shortKey === language);
      const currentLanguage = hasLanguage ? language === "en" ? "" : `${language}/` : "";

      // Generate a unique key for payload
      let key = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 1; i <= 12; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        key += str.charAt(char);
      };

      // Data for Amazon S3
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_REGION,
      });

      // Amazon S3 params for docxf
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: fileName,
        Body: fs.createReadStream(files.file[0].filepath)
      };

      // Get docxf response from Amazon S3
      const docxfAwsResponse = await s3.upload(params).promise();
      const docxfAwsUrl = `https://${docxfAwsResponse.Bucket}/${docxfAwsResponse.key}`;

      // Payload data
      const cardPreviewPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 1448,
          "width": 1024
        },
        "title": fileName,
        "url": docxfAwsUrl
      };

      const pdfPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "pdf",
        "title": fileName,
        "url": docxfAwsUrl
      };

      // Generate tokens for AuthorizationJwt
      const cardPreviewToken = jwt.sign(cardPreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const pdfToken = jwt.sign(pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      // Send request to ConvertService and get result
      const cardPreviewRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, cardPreviewPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${cardPreviewToken}`
        }
      });

      const pdfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, pdfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${pdfToken}`
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
        Key: fileName
      }).promise();

      const compressedData = zlib.deflateSync(`${cardPreviewRequest.data.fileUrl};${pdfRequest.data.fileUrl};${pageCount};${fileNameSubstring};${formName}`);
      const compressedString = compressedData.toString("base64");

      return res.status(200).send(`${CMSConfigAPI}${`${currentLanguage}`}form-submit?index=${compressedString}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error");
    };
  });
};