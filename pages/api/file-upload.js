import fs from "fs";
import formidable from "formidable";
import axios from "axios";
import jwt from "jsonwebtoken";
import S3 from "aws-sdk/clients/s3";

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

      // Amazon S3 params
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: fileName,
        Body: fs.createReadStream(files.file[0].filepath)
      };

      // Get response from Amazon S3
      const awsResponse = await s3.upload(params).promise();
      const awsUrl = `https://${awsResponse.Bucket}/${awsResponse.key}`;

      // Payload data
      const templatePreviewPayload = {
        "filetype": fileType,
        "key": key,
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 1448,
          "width": 1024
        },
        "title": fileName,
        "url": awsUrl
      };

      const pdfPayload = {
        "filetype": fileType,
        "key": key,
        "outputtype": "pdf",
        "title": fileName,
        "url": awsUrl
      };

      // Generate tokens for AuthorizationJwt
      const templatePreviewToken = jwt.sign(templatePreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const pdfToken = jwt.sign(pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

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

      // Delete temporary file
      fs.promises.unlink(files.file[0].filepath);

      // Delete file in Amazon S3
      await s3.deleteObject({
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: fileName
      }).promise();

      return res.status(200).json({
        "templatePreviewConvertUrl": templatePreviewRequest.data.fileUrl,
        "pdfConvertUrl": pdfRequest.data.fileUrl,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};