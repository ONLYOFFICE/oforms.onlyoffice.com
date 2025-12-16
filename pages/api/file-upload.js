import fs from "fs";
import formidable from "formidable";
import axios from "axios";
import jwt from "jsonwebtoken";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { PDFDocument } from "pdf-lib";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      const fileName = `${Date.now()}_${files.file[0].originalFilename}`;
      const fileType = files.file[0].originalFilename?.match(/\.(\w+)$/)?.[1];

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
      const s3 = new S3Client({
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
        }
      });

      // Amazon S3 params
      const params = {
        Bucket: process.env.BUCKET,
        Key: fileName,
        Body: fs.createReadStream(files.file[0].filepath)
      };

      // Get response from Amazon S3
      await s3.send(new PutObjectCommand(params));
      const s3Url = `https://${process.env.BUCKET}/${fileName}`;

      // Payload data
      const pdfPayload = {
        "filetype": fileType,
        "key": generateKey(),
        "outputtype": "pdf",
        "title": fileName,
        "url": s3Url
      };

      // Generate tokens for AuthorizationJwt
      const pdfToken = jwt.sign(pdfPayload, process.env.FILES_DOCSERVICE_SECRET);

      // Send request to ConvertService and get result
      const pdfRequest = await axios.post(`${process.env.EDITOR_API_URL}/ConvertService.ashx`, pdfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${pdfToken}`
        }
      });

      const pdfResponse = await axios.get(pdfRequest.data.fileUrl, { responseType: "arraybuffer" });
      const pdfDoc = await PDFDocument.load(new Uint8Array(pdfResponse.data));
      // page width and height
      const { width, height } = pdfDoc.getPage(0).getSize();
      // Number of pages in PDF
      const pageCount = pdfDoc.getPageCount();

      // Payload data
      const templatePreviewPayload = {
        "filetype": fileType,
        "key": generateKey(),
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": width > height ? 1024 : 1448,
          "width": width > height ? 1448 : 1024
        },
        "title": fileName,
        "url": s3Url
      };

      // Generate tokens for AuthorizationJwt
      const templatePreviewToken = jwt.sign(templatePreviewPayload, process.env.FILES_DOCSERVICE_SECRET);

      // Send request to ConvertService and get result
      const templatePreviewRequest = await axios.post(`${process.env.EDITOR_API_URL}/ConvertService.ashx`, templatePreviewPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${templatePreviewToken}`
        }
      });

      // Delete temporary file
      fs.promises.unlink(files.file[0].filepath);

      // Delete file in Amazon S3
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.BUCKET,
        Key: fileName
      }));

      return res.status(200).json({
        "templatePreviewConvertUrl": templatePreviewRequest.data.fileUrl,
        "pageCount": pageCount,
        "fileOrientation": width > height ? "horizontal" : "vertical"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};