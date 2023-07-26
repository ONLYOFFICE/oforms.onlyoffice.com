import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import formidable from "formidable";
import axios from "axios";
import jwt from "jsrsasign";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      const fileName = files.file[0].originalFilename;
      const filePath = files.file[0].filepath;

      // Delete File from AWS S3
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_REGION,
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: fileName,
        Body: fs.createReadStream(filePath)
      };

      const params2 = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: fileName,
      };

      // Get docxf response from AWS
      await s3.putObject(params).promise();
      const awsUrl = s3.getSignedUrl("getObject", params2);
      const docxfConvertUrl = awsUrl.replace("/s3.amazonaws.com", "");

      // Generate a unique key for payload
      let key = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 1; i <= 12; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        key += str.charAt(char);
      };

      // Payload data
      const oformPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "oform",
        "title": fileName,
        "url": docxfConvertUrl
      };

      const docxfPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "docxf",
        "title": fileName,
        "url": docxfConvertUrl
      };

      const templateImagePayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 916,
          "width": 648
        },
        "title": fileName,
        "url": docxfConvertUrl
      };

      // Generate tokens for AuthorizationJwt
      const oformToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), oformPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const docxfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), docxfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const templateImageToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), templateImagePayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      // Send requests to ConvertService and get result
      const oformRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, oformPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${oformToken}`
        }
      });

      const docxfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, docxfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${docxfToken}`
        }
      });

      const templateImageRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, templateImagePayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${templateImageToken}`
        }
      });

      return res.status(200).json({
        "oformConvertUrl": oformRequest.data.fileUrl,
        "docxfConvertUrl": docxfRequest.data.fileUrl,
        "templateImageConvertUrl": templateImageRequest.data.fileUrl,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send("Error");
    };
  });
};