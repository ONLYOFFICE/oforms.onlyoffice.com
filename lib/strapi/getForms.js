import CONFIG from "@config/config";

const getAllForms = async (locale, page, _sort, pageSize) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/oforms/?sort=name_form:${_sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew&populate=categories&locale=${locale}`
  );
  const data = await res.json();
  return data;
};

export default getAllForms;
