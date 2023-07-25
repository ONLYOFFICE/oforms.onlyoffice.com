import fs from "fs";
import formidable from "formidable";
import axios from "axios";
import jwt from "jsrsasign";
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
      const name = files.file[0].originalFilename;

      // Generate a unique key for payload
      let key = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 1; i <= 12; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        key += str.charAt(char);
      };

      // Data for AWS S3
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_REGION,
      });

      // AWS params for docxf
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: name,
        Body: fs.createReadStream(files.file[0].filepath)
      };

      const urlParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: name,
      };

      // Get docxf response from AWS
      await s3.putObject(params).promise();
      const awsUrl = s3.getSignedUrl("getObject", urlParams);
      const url = awsUrl.replace("/s3.amazonaws.com", "");

      // Payload data
      const docxfPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 1448,
          "width": 1024
        },
        "title": name,
        "url": url
      };

      const pdfPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "pdf",
        "title": name,
        "url": url
      };

      // Generate tokens for AuthorizationJwt
      const docxfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), docxfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const pdfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      // Send request to ConvertService and get result
      const docxfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, docxfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${docxfToken}`
        }
      });

      const pdfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, pdfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${pdfToken}`
        }
      });

      return res.status(200).json({
        "pngConvertUrl": docxfRequest.data.fileUrl,
        "filePages": "1"
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send("Error");
    };
  });
};