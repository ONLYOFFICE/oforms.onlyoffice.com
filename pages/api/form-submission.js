import axios from "axios";
import jwt from "jsrsasign";
import FormData from "form-data";
import CONFIG from "@config/config";

export default async function handler(req, res) {
  const { сardPreviewUrl, pdfFileUrl, name, description, fileSize, fileName, fileLastModifiedDate, languageKey, categoryId, filePages } = req.body;

  try {
    await axios.get(сardPreviewUrl);
  } catch (error) {
    return res.json({ error: "card_prewiew" });
  };

  try {
    const fileNameSubstring = fileName.substring(0, fileName.length - 6);
    const uploadApiUrl = `${CONFIG.api.cms}/api/upload`;

    // Generate a unique key for payload
    let key = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i <= 12; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      key += str.charAt(char);
    };

    // Payload data
    const oformPayload = {
      "filetype": "pdf",
      "key": key,
      "outputtype": "oform",
      "title": fileName,
      "url": pdfFileUrl
    };

    const docxfPayload = {
      "filetype": "pdf",
      "key": key,
      "outputtype": "docxf",
      "title": fileName,
      "url": pdfFileUrl
    };

    const templateImagePayload = {
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

    // Send Form
    try {
      await axios.post(`${CONFIG.api.cms}/api/oforms`, {
        "data": {
          "name_form": name,
          "file_size": `${fileSize.toString().substring(0, 2)} kB`,
          "file_last_update": fileLastModifiedDate,
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
        const cardPreviewResponse = await axios.get(сardPreviewUrl, { responseType: "arraybuffer" });
        const cardPreviewData = new FormData();
        cardPreviewData.append("files", Buffer.from(cardPreviewResponse.data), `${fileNameSubstring}.png`);
        cardPreviewData.append("ref", "api::oform.oform");
        cardPreviewData.append("refId", response.data.data.id);
        cardPreviewData.append("field", "card_prewiew");

        const templateImageResponse = await axios.get(templateImageRequest.data.fileUrl, { responseType: "arraybuffer" });
        const templateImageData = new FormData();
        templateImageData.append("files", Buffer.from(templateImageResponse.data), `${fileNameSubstring}.png`);
        templateImageData.append("ref", "api::oform.oform");
        templateImageData.append("refId", response.data.data.id);
        templateImageData.append("field", "template_image");

        const oformFileResponse = await axios.get(oformRequest.data.fileUrl, { responseType: "arraybuffer" });
        const oformFileData = new FormData();
        oformFileData.append("files", Buffer.from(oformFileResponse.data), { filename: `${fileNameSubstring}.oform`, contentType: "application/octet-stream" });
        oformFileData.append("ref", "api::oform.oform");
        oformFileData.append("refId", response.data.data.id);
        oformFileData.append("field", "file_oform");

        const docxfFileResponse = await axios.get(docxfRequest.data.fileUrl, { responseType: "arraybuffer" });
        const docxfFileData = new FormData();
        docxfFileData.append("files", Buffer.from(docxfFileResponse.data), { filename: `${fileNameSubstring}.docxf`, contentType: "application/octet-stream" });
        docxfFileData.append("ref", "api::oform.oform");
        docxfFileData.append("refId", response.data.data.id);
        docxfFileData.append("field", "file_oform");

        const pdfFileResponse = await axios.get(pdfFileUrl, { responseType: "arraybuffer" });
        const pdfFileData = new FormData();
        pdfFileData.append("files", Buffer.from(pdfFileResponse.data), { filename: `${fileNameSubstring}.pdf`, contentType: "application/octet-stream" });
        pdfFileData.append("ref", "api::oform.oform");
        pdfFileData.append("refId", response.data.data.id);
        pdfFileData.append("field", "file_oform");

        await axios.post(uploadApiUrl, cardPreviewData, {
          headers: {
            ...cardPreviewData.getHeaders(),
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        });

        await axios.post(uploadApiUrl, templateImageData, {
          headers: {
            ...templateImageData.getHeaders(),
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        });

        await axios.post(uploadApiUrl, oformFileData, {
          headers: {
            ...oformFileData.getHeaders(),
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        });

        await axios.post(uploadApiUrl, docxfFileData, {
          headers: {
            ...docxfFileData.getHeaders(),
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        });

        await axios.post(uploadApiUrl, pdfFileData, {
          headers: {
            ...pdfFileData.getHeaders(),
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        });
      });
    } catch {
      return res.json({ error: "name_form" });
    };

    return res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred while submitting the form");
  };
};