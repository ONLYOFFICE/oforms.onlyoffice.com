import axios from "axios";
import CONFIG from "@config/config.json";

export default async function handler(req, res) {
  const { locale } = req.body;

  try {
    const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
    const response = await axios.get(`${CMSConfigAPI}/api/categories/?locale=${locale}`);

    return res.status(200).json({
      "categories": response.data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  };
};