import CONFIG from "@config/config.json";

const getAllCompilations = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/compilations/?locale=${locale}`
  );
  const data = await res.json();
  return data;
};

export default getAllCompilations;
