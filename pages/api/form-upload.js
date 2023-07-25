import CONFIG from "@config/config";
import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import formidable from "formidable";
import axios from "axios";
import jwt from "jsrsasign";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/ja";
import "moment/locale/zh-cn";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      const uploadApiUrl = `${CONFIG.api.cms}/api/upload`;
      const { name, description, fileImg, filePages, categoryId, languageKey } = fields;
      const fileName = files.file[0].originalFilename;
      const filePath = files.file[0].filepath;
      const fileSize = files.file[0].size;
      const fileLastModifiedDate = files.file[0].lastModifiedDate;

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

      const pdfPayload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "pdf",
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
      const pdfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const templateImageToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), templateImagePayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      // Send requests to ConvertService and get result
      const oformRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, oformPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${oformToken}`
        }
      });

      const pdfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, pdfPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${pdfToken}`
        }
      });

      const templateImageRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, templateImagePayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${templateImageToken}`
        }
      });

      // Send Form to Strapi
      await axios.post(`${CONFIG.api.cms}/api/oforms`, {
        "data": {
          "name_form": name,
          "file_size": `${fileSize.toString().substring(0, 2)} kB`,
          "file_last_update": moment(fileLastModifiedDate).locale(languageKey).format(
            languageKey === "zh" ? "Y年MM月DD" : languageKey === "ja" ? "Y年MM月DD日" : "MMMM D, y"
          ),
          "file_pages": filePages,
          "template_desc": description,
          "categories": categoryId,
          "locale": languageKey,
          "publishedAt": null
        }
      }).then(async (res) => {
        const cardPreviewData = new FormData();
        cardPreviewData.append("files", fileImg);
        cardPreviewData.append("ref", "api::oform.oform");
        cardPreviewData.append("refId", res.data.data.id);
        cardPreviewData.append("field", "card_prewiew");

        const templateImageData = new FormData();
        templateImageData.append("files", templateImageRequest.data.fileUrl);
        templateImageData.append("ref", "api::oform.oform");
        templateImageData.append("refId", res.data.data.id);
        templateImageData.append("field", "template_image");

        const oformFileData = new FormData();
        oformFileData.append("files", oformRequest.data.fileUrl);
        oformFileData.append("ref", "api::oform.oform");
        oformFileData.append("refId", res.data.data.id);
        oformFileData.append("field", "file_oform");

        const docxfFileData = new FormData();
        docxfFileData.append("files", docxfConvertUrl);
        docxfFileData.append("ref", "api::oform.oform");
        docxfFileData.append("refId", res.data.data.id);
        docxfFileData.append("field", "file_oform");

        const pdfFileData = new FormData();
        pdfFileData.append("files", pdfRequest.data.fileUrl);
        pdfFileData.append("ref", "api::oform.oform");
        pdfFileData.append("refId", res.data.data.id);
        pdfFileData.append("field", "file_oform");

        await axios.post(uploadApiUrl, cardPreviewData)
        await axios.post(uploadApiUrl, templateImageData);
        await axios.post(uploadApiUrl, oformFileData);
        await axios.post(uploadApiUrl, docxfFileData);
        await axios.post(uploadApiUrl, pdfFileData);
      }).then(async () => {
        await s3.deleteObject(params2).promise();
      })

      return res.status(200).send("Form upload successfully");
    } catch (error) {
      console.log(error)
      return res.status(500).send("Error");
    };
  });
};