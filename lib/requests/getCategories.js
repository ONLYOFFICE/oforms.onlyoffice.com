import CONFIG from "@config/config.json";
import cmsLocale from "@utils/helpers/cmsLocale";

const getCategories = async (locale, collectionTypePlural, categoryFieldName, localeField) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(`${CMSConfigAPI}/api/${collectionTypePlural}/?locale=${cmsLocale(locale)}&fields=${categoryFieldName}&fields=urlReq${localeField ? "&fields=locale" : ""}`);
  const data = await res.json();
  return data;
};

export default getCategories;
