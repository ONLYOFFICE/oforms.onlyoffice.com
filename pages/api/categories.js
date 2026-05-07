import axios from "axios";
import CONFIG from "@config/config.json";
import cmsLocale from "@utils/helpers/cmsLocale";

export default async function handler(req, res) {
  const { locale } = req.body;

  try {
    const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
    const response = await axios.get(`${CMSConfigAPI}/api/categories/?locale=${cmsLocale(locale)}`);

    return res.status(200).json({
      "categories": response.data
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
};