import CONFIG from "@config/config.json"

const getCompilations = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(`${CMSConfigAPI}/api/compilations/?locale=${locale}&populate=oforms&filters[oforms][$not]=null`);
  const data = await res.json();
  return data;
};

export default getCompilations;
