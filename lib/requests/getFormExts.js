import CONFIG from "@config/config.json";
import cmsLocale from "@utils/helpers/cmsLocale";

const getFormExts = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(`${CMSConfigAPI}/api/form-exts/?locale=${cmsLocale(locale)}&fields=ext`);
  const data = await res.json();
  return data;
};

export default getFormExts;