import CONFIG from "@config/config";

const getCategories = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/categories/?locale=${locale}`
  );
  const data = await res.json();
  return data;
};

export default getCategories;
