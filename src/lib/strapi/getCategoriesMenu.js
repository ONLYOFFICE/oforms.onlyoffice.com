import CONFIG from "@config/config.json";

const getCategoriesMenu = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/menu-translations/?locale=${locale}`
  );
  const data = await res.json();
  return data;
};

export default getCategoriesMenu;
