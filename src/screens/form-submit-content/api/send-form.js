import CONFIG from "@config/config";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/ja";
import "moment/locale/zh-cn";

const sendFormApi = async (
  oformConvertUrl,
  docxfUrl,
  templateImageConvertUrl,
  pdfUrl,
  cardPreviewUrl,
  fileSize,
  fileName,
  name,
  fileLastModifiedDate,
  languageKey,
  filePages,
  description,
  categoryId
) => {
  const fileNameSubstring = fileName.substring(0, fileName.length - 6);
  const uploadApiUrl = `${CONFIG.api.cms}/api/upload`;

  // Сonvert card preview, template image, docxf, pdf, oform links to File data
  const cardPreviewUrlFile = await axios.get(cardPreviewUrl, { responseType: "blob" });
  const cardPreviewUrlFileParams = new File([cardPreviewUrlFile.data], `${fileNameSubstring}.png`, { type: "image/png" });

  const oformFile = await axios.get(oformConvertUrl, { responseType: "blob" });
  const oformFileParams = new File([oformFile.data], `${fileNameSubstring}.oform`, { type: oformFile.headers["content-type"] });

  const docxfFile = await axios.get(docxfUrl, { responseType: "blob" });
  const docxfFileParams = new File([docxfFile.data], `${fileNameSubstring}.docxf`, { type: docxfFile.headers["content-type"] });

  const pdfFile = await axios.get(pdfUrl, { responseType: "blob" });
  const pdfFileParams = new File([pdfFile.data], `${fileNameSubstring}.pdf`, { type: "application/octet-stream" });

  const templateImgFile = await axios.get(templateImageConvertUrl, { responseType: "blob" });
  const templateImgFileParams = new File([templateImgFile.data], `${fileNameSubstring}.png`, { type: "image/png" });

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
    cardPreviewData.append("files", cardPreviewUrlFileParams);
    cardPreviewData.append("ref", "api::oform.oform");
    cardPreviewData.append("refId", res.data.data.id);
    cardPreviewData.append("field", "card_prewiew");

    const templateImageData = new FormData();
    templateImageData.append("files", templateImgFileParams);
    templateImageData.append("ref", "api::oform.oform");
    templateImageData.append("refId", res.data.data.id);
    templateImageData.append("field", "template_image");

    const oformFileData = new FormData();
    oformFileData.append("files", oformFileParams);
    oformFileData.append("ref", "api::oform.oform");
    oformFileData.append("refId", res.data.data.id);
    oformFileData.append("field", "file_oform");

    const docxfFileData = new FormData();
    docxfFileData.append("files", docxfFileParams);
    docxfFileData.append("ref", "api::oform.oform");
    docxfFileData.append("refId", res.data.data.id);
    docxfFileData.append("field", "file_oform");

    const pdfFileData = new FormData();
    pdfFileData.append("files", pdfFileParams);
    pdfFileData.append("ref", "api::oform.oform");
    pdfFileData.append("refId", res.data.data.id);
    pdfFileData.append("field", "file_oform");

    await axios.post(uploadApiUrl, cardPreviewData)
    await axios.post(uploadApiUrl, templateImageData);
    await axios.post(uploadApiUrl, oformFileData);
    await axios.post(uploadApiUrl, docxfFileData);
    await axios.post(uploadApiUrl, pdfFileData);
  });

  return;
};

export default sendFormApi;