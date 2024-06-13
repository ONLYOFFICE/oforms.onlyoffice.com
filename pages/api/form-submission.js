import axios from "axios";
import jwt from "jsonwebtoken";
import FormData from "form-data";
import nodemailer from "nodemailer";
import CONFIG from "@config/config";

export default async function handler(req, res) {
  const { templatePreviewUrl, pdfFileUrl, name, description, fileName, languageKey, categoryId, filePages } = req.body;

  try {
    await axios.get(templatePreviewUrl);
  } catch (error) {
    return res.json({ error: "card_prewiew" });
  };

  try {
    const fileNameSubstring = fileName.substring(0, fileName.length - 6);
    const fileType = fileName?.match(/\.(\w+)$/)?.[1];
    const uploadApiUrl = `${CONFIG.api.cms}/api/upload`;

    let filePayload = null;
    let fileToken = null;
    let fileRequest = null;
    let fileResponse = null;

    // Generate a unique key for payload
    let key = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i <= 12; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      key += str.charAt(char);
    };

    // Payload data
    const cardPreviewPayload = {
      "filetype": "pdf",
      "key": key,
      "outputtype": "png",
      "thumbnail": {
        "aspect": 0,
        "first": true,
        "height": 916,
        "width": 648
      },
      "title": fileName,
      "url": pdfFileUrl
    };

    const cardDesktopPreviewPayload = {
      "filetype": "pdf",
      "key": key,
      "outputtype": "png",
      "thumbnail": {
        "aspect": 0,
        "first": true,
        "height": 260,
        "width": 184
      },
      "title": fileName,
      "url": pdfFileUrl
    };

    const desktopPreviewPayload = {
      "filetype": "pdf",
      "key": key,
      "outputtype": "png",
      "thumbnail": {
        "aspect": 0,
        "first": true,
        "height": 566,
        "width": 400
      },
      "title": fileName,
      "url": pdfFileUrl
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

    if (fileType === "xlsx" || fileType === "pptx" || fileType === "docx") {
      filePayload = {
        "filetype": "pdf",
        "key": key,
        "outputtype": fileType,
        "title": fileName,
        "url": pdfFileUrl
      };

      fileToken = jwt.sign(cardPreviewPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      fileRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, filePayload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${fileToken}`
        }
      });
    }

    // Send Form
    try {
      await axios.post(`${CONFIG.api.cms}/api/oforms`, {
        "data": {
          "name_form": name,
          "file_pages": filePages,
          "template_desc": description,
          "categories": categoryId,
          "locale": languageKey,
          "publishedAt": null
        }
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        }
      }).then(async (response) => {
        const templatePreviewResponse = await axios.get(templatePreviewUrl, { responseType: "arraybuffer" });
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

        if (fileType === "xlsx" || fileType === "pptx" || fileType === "docx") {
          fileResponse = await axios.get(fileRequest.data.fileUrl, { responseType: "arraybuffer" });
          const fileData = new FormData();
          fileData.append("files", Buffer.from(fileResponse.data), { filename: `${fileNameSubstring}.${fileType}`, contentType: "application/octet-stream" });
          fileData.append("ref", "api::oform.oform");
          fileData.append("refId", response.data.data.id);
          fileData.append("field", "file_oform");
          
          await axios.post(uploadApiUrl, fileData, {
            headers: {
              ...fileData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });
        } else {
          const pdfFileResponse = await axios.get(pdfFileUrl, { responseType: "arraybuffer" });
          const pdfFileData = new FormData();
          pdfFileData.append("files", Buffer.from(pdfFileResponse.data), { filename: `${fileNameSubstring}.pdf`, contentType: "application/octet-stream" });
          pdfFileData.append("ref", "api::oform.oform");
          pdfFileData.append("refId", response.data.data.id);
          pdfFileData.append("field", "file_oform");

          await axios.post(uploadApiUrl, pdfFileData, {
            headers: {
              ...pdfFileData.getHeaders(),
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });
        }

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
};
