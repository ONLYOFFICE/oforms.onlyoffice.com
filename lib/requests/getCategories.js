import CONFIG from "@config/config.json";

const getCategories = async (locale, collectionTypePlural, categoryFieldName, localeField) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(`${CMSConfigAPI}/api/${collectionTypePlural}/?locale=${locale === "pt" ? "pt-br" : locale}&filters[oforms][$not]=null&fields=${categoryFieldName}&fields=urlReq${localeField ? "&fields=locale" : ""}`);
  const data = await res.json();
  return data;
};

export default getCategories;
