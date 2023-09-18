import axios from "axios";
import CONFIG from "@config/config.json";

export default async function handler(req, res) {
  const { locale, page, _sort, pageSize } = req.body;

  try {
    const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
    const formsResponse = await axios.get(`${CMSConfigAPI}/api/oforms/?sort=name_form:${_sort}${pageSize ? `&pagination[pageSize]=${pageSize}` : ''}&pagination[page]=${page}&populate=template_image&populate=file_oform&populate=card_prewiew&populate=categories&locale=${locale}`);

    return res.status(200).json({
      "forms": formsResponse.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  };
};