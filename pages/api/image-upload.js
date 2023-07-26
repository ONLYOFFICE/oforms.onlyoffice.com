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
      const fileName = files.file[0].originalFilename;

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
      const docxfAwsUrl = docxfAwsResponse.Location.replace("/s3.amazonaws.com", "");

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
      const cardPreviewToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), cardPreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const pdfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

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

      // Get response png and pdf files from Amazon S3
      const cardPreviewResponse = await axios.get(cardPreviewRequest.data.fileUrl, { responseType: "arraybuffer" });
      const pdfResponse = await axios.get(pdfRequest.data.fileUrl, { responseType: "arraybuffer" });

      // Payload data
      const cardPreviewParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: `${fileName.substring(0, fileName.length - 6)}?card_preview.png`,
        Body: cardPreviewResponse.data,
        ContentType: cardPreviewResponse.headers["content-type"]
      };

      const pdfParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET,
        Key: `${fileName.substring(0, fileName.length - 6)}.pdf`,
        Body: pdfResponse.data,
        ContentType: pdfResponse.headers["content-type"]
      };

      // Upload files to Amazon s3
      const cardPreviewAwsResponse = await s3.upload(cardPreviewParams).promise();
      const pdfAwsResponse = await s3.upload(pdfParams).promise();

      // Get location file and rename
      const cardPreviewAwstUrl = cardPreviewAwsResponse.Location.replace("/s3.amazonaws.com", "");
      const pdfAwstUrl = pdfAwsResponse.Location.replace("/s3.amazonaws.com", "");

      return res.status(200).json({
        "pngConvertUrl": cardPreviewAwstUrl,
        "pdfConvertUrl": pdfAwstUrl,
        "docxfConverUrl": docxfAwsUrl
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send("Error");
    };
  });
};