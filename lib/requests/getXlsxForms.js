import CONFIG from "@config/config.json";

const getXlsxForms = async (locale, page, _sort, pageSize) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(`${CMSConfigAPI}/api/oforms/?sort=name_form:${_sort}&_start=0${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}&pagination[page]=${page}&locale=${locale}&populate=card_prewiew&populate=form_exts&filters[form_exts][ext][$eq]=xlsx`);
  const data = await res.json();
  return data;
};

export default getXlsxForms;
