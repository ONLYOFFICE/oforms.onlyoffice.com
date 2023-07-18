import axios from "axios";
import jwt from "jsrsasign";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/ja";
import "moment/locale/zh-cn";

const formUploadApi = async (file, fileName, fileImg, name, description, categoryId, languageKey, convertPdfFile, filePages, docxfResponse, setUploadPopup, setFormLoading) => {
  const fileNameSubstring = fileName.substring(0, fileName.length - 6);
  const uploadApiUrl = "https://oforms.teamlab.info/dashboard/api/upload";

  // Generate a unique key for payload
  let key = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i <= 12; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    key += str.charAt(char);
  };

  try {
    // Payload data
    const oformPayload = {
      "filetype": "docxf",
      "key": key,
      "outputtype": "oform",
      "title": fileName,
      "url": `https:/${docxfResponse}`
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
      "url": `https:/${docxfResponse}`
    };

    // Generate tokens for AuthorizationJwt
    const oformToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), oformPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
    const templateImageToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), templateImagePayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

    // Send requests to ConvertService and get result
    const oformRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, oformPayload, {
      headers: {
        "Content-Type": "application/json",
        "AuthorizationJwt": `Bearer ${oformToken}`
      }
    });

    const templateImageRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, templateImagePayload, {
      headers: {
        "Content-Type": "application/json",
        "AuthorizationJwt": `Bearer ${templateImageToken}`
      }
    });

    // Get result from oform and template image requests
    const result = await axios.all([oformRequest, templateImageRequest]);

    // Сonvert card preview, template image, docxf, pdf, oform links to File data
    const fileImgFile = await axios.get(fileImg, { responseType: "blob" });
    const fileImgFileParams = new File([fileImgFile.data], `${fileNameSubstring}.png`, { type: "image/png" });

    const oformFile = await axios.get(result[0].data.fileUrl, { responseType: "blob" });
    const oformFileParams = new File([oformFile.data], `${fileNameSubstring}.oform`, { type: oformFile.headers["content-type"] });

    const docxfFile = await axios.get(`https:/${docxfResponse}`, { responseType: "blob" });
    const docxfFileParams = new File([docxfFile.data], `${fileNameSubstring}.docxf`, { type: docxfFile.headers["content-type"] });

    const pdfFile = await axios.get(convertPdfFile, { responseType: "blob" });
    const pdfFileParams = new File([pdfFile.data], `${fileNameSubstring}.pdf`, { type: "application/octet-stream" });

    const templateImgFile = await axios.get(result[1].data.fileUrl, { responseType: "blob" });
    const templateImgFileParams = new File([templateImgFile.data], `${fileNameSubstring}.png`, { type: "image/png" });

    // Send Form to Strapi
    await axios.post(`https://oforms.teamlab.info/dashboard/api/oforms`, {
      "data": {
        "name_form": name,
        "file_size": `${file.size.toString().substring(0, 2)} kB`,
        "file_last_update": moment(file.lastModifiedDate).locale(languageKey).format(
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
      cardPreviewData.append("files", fileImgFileParams);
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
    }).then(() => {
      setUploadPopup(true);
      setFormLoading(false);
    });
  } catch (error) {
    console.error(error);
  };
};

export default formUploadApi;