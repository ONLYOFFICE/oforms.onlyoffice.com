import axios from "axios";
import CONFIG from "@config/config.json";

export default async function handler(req, res) {
  const { locale } = req.body;

  try {
    const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
    const categoriesResponse = await axios.get(`${CMSConfigAPI}/api/categories/?locale=${locale}&populate=localizations`);
    const typesResponse = await axios.get(`${CMSConfigAPI}/api/types/?locale=${locale}&populate=localizations`);
    const compilationsResponse = await axios.get(`${CMSConfigAPI}/api/compilations/?locale=${locale}&populate=localizations`);
    const categoriesMenuResponse = await axios.get(`${CMSConfigAPI}/api/menu-translations/?locale=${locale}&populate=localizations`);

    return res.status(200).json({
      "categories": categoriesResponse.data,
      "types": typesResponse.data,
      "compilations": compilationsResponse.data,
      "menu": categoriesMenuResponse.data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  };
};