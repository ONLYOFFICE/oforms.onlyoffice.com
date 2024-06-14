import formidable from "formidable";
import axios from "axios";
import jwt from "jsonwebtoken";
import FormData from "form-data";
import nodemailer from "nodemailer";
import CONFIG from "@config/config";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      await axios.get(fields.templatePreviewUrl[0]);
    } catch (error) {
      return res.json({ error: "card_prewiew" });
    };

    try {
      const uploadApiUrl = `${CONFIG.api.cms}/api/upload`;
      const queryUrl = fields.queryUrl[0];
      const fileType = queryUrl?.match(/\.(\w+)$/)?.[1];
      const fileNameSubstring = queryUrl.substring(0, queryUrl.length - queryUrl?.match(/\.(\w+)$/)?.[0].length);
      const parts = queryUrl.split('/');
      const fileName = parts[parts.length - 1];
      const uniqueFileName = `${Date.now()}_${fileName}`;

      // Generate a unique key for payload
      const generateKey = () => {
        let key = "";
        const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 12; i++) {
          key += str.charAt(Math.floor(Math.random() * str.length));
        }
        return key;
      };

      // Payload data
      const cardPreviewPayload = {
        "filetype": "pdf",
        "key": generateKey(),
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 916,
          "width": 648
        },
        "title": uniqueFileName,
        "url": queryUrl
      };

      const cardDesktopPreviewPayload = {
        "filetype": "pdf",
        "key": generateKey(),
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 260,
          "width": 184
        },
        "title": uniqueFileName,
        "url": queryUrl
      };

      const desktopPreviewPayload = {
        "filetype": "pdf",
        "key": generateKey(),
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "height": 566,
          "width": 400
        },
        "title": uniqueFileName,
        "url": queryUrl
      };

      // Generate tokens for AuthorizationJwt
      const cardPreviewToken = jwt.sign(cardPreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const cardDesktopPreviewToken = jwt.sign(cardDesktopPreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
      const desktopPreviewToken = jwt.sign(desktopPreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      // Send requests to ConvertService and get result
      const cardPreviewRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, cardPreviewPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${cardPreviewToken}`
        }
      });

      const cardDesktopPreviewRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, cardDesktopPreviewPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${cardDesktopPreviewToken}`
        }
      });

      const desktopPreviewRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, desktopPreviewPayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${desktopPreviewToken}`
        }
      });

      // Send Form
      try {
        await axios.post(`${CONFIG.api.cms}/api/oforms`, {
          "data": {
            "name_form": fields.name[0],
            "template_desc": fields.description[0],
            "categories": fields.categoryId[0],
            "locale": fields.languageKey[0],
            "form_exts": fields.formExt[0],
            "publishedAt": null
          }
        }, {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        }).then(async (response) => {
          const templatePreviewResponse = await axios.get(fields.templatePreviewUrl[0], { responseType: "arraybuffer" });
          const templatePreviewData = new FormData();
          templatePreviewData.append("files", Buffer.from(templatePreviewResponse.data), `${fileNameSubstring}.png`);
          templatePreviewData.append("ref", "api::oform.oform");
          templatePreviewData.append("refId", response.data.data.id);
          templatePreviewData.append("field", "card_prewiew");

          const cardPreviewResponse = await axios.get(cardPreviewRequest.data.fileUrl, { responseType: "arraybuffer" });
          const cardPreviewData = new FormData();
          cardPreviewData.append("files", Buffer.from(cardPreviewResponse.data), `${fileNameSubstring}.png`);
          cardPreviewData.append("ref", "api::oform.oform");
          cardPreviewData.append("refId", response.data.data.id);
          cardPreviewData.append("field", "template_image");

          const cardDesktopPreviewResponse = await axios.get(cardDesktopPreviewRequest.data.fileUrl, { responseType: "arraybuffer" });
          const cardDesktopPreviewData = new FormData();
          cardDesktopPreviewData.append("files", Buffer.from(cardDesktopPreviewResponse.data), `${fileNameSubstring}.png`);
          cardDesktopPreviewData.append("ref", "api::oform.oform");
          cardDesktopPreviewData.append("refId", response.data.data.id);
          cardDesktopPreviewData.append("field", "card_desktop_preview");

          const desktopPreviewResponse = await axios.get(desktopPreviewRequest.data.fileUrl, { responseType: "arraybuffer" });
          const desktopPreviewData = new FormData();
          desktopPreviewData.append("files", Buffer.from(desktopPreviewResponse.data), `${fileNameSubstring}.png`);
          desktopPreviewData.append("ref", "api::oform.oform");
          desktopPreviewData.append("refId", response.data.data.id);
          desktopPreviewData.append("field", "desktop_preview");

          let contentType;
          if (fileType === "xlsx") {
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          } else if (fileType === "pptx") {
            contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
          } else if (fileType === "docx") {
            contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          } else if (fileType === "pdf") {
            contentType = "application/pdf";
          }

          const fileResponse = await axios.get(queryUrl, { responseType: "arraybuffer" });
          const fileData = new FormData();
          fileData.append("files", Buffer.from(fileResponse.data), { filename: `${fileNameSubstring}.${fileType}`, contentType });
          fileData.append("ref", "api::oform.oform");
          fileData.append("refId", response.data.data.id);
          fileData.append("field", "file_oform");

          await axios.post(uploadApiUrl, templatePreviewData, {
            headers: {
              ...templatePreviewData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });

          await axios.post(uploadApiUrl, cardPreviewData, {
            headers: {
              ...cardPreviewData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });

          await axios.post(uploadApiUrl, cardDesktopPreviewData, {
            headers: {
              ...cardDesktopPreviewData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });

          await axios.post(uploadApiUrl, desktopPreviewData, {
            headers: {
              ...desktopPreviewData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });

          await axios.post(uploadApiUrl, fileData, {
            headers: {
              ...fileData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });

          const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_EMAIL_HOST,
            port: process.env.NEXT_PUBLIC_EMAIL_PORT,
            auth: {
              user: process.env.NEXT_PUBLIC_EMAIL_AUTH_USER,
              pass: process.env.NEXT_PUBLIC_EMAIL_AUTH_PASSWORD,
            },
          });

          const mailOptions = {
            from: `oforms.onlyoffice.com <${process.env.NEXT_PUBLIC_EMAIL_AUTH_USER}>`,
            to: [process.env.NEXT_PUBLIC_EMAIL_ACCOUNT_1, process.env.NEXT_PUBLIC_EMAIL_ACCOUNT_2],
            subject: "У вас новая форма из https://oforms.onlyoffice.com/form-submit",
            text: "У вас новая форма из https://oforms.onlyoffice.com/form-submit. Проверьте, пожалуйста.",
          };

          await transporter.sendMail(mailOptions);
        });
      } catch(error) {
        return res.json({ error: "name_form" });
      };

      return res.status(200).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};
