import CONFIG from "@config/config.json";

const getPopularTemplates = async (locale, _sort) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(`${CMSConfigAPI}/api/oforms/?sort=name_form:${_sort}&_start=0&_limit=-1&locale=${locale}&populate=card_prewiew&populate=form_exts&filters[popular_template][$eq]=true`);
  const data = await res.json();

  return data;
};

export default getPopularTemplates;