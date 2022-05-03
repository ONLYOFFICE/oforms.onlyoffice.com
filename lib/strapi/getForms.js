import CONFIG from "@config/config";

const getAllForms = async (locale, page, _sort, pageSize) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/oforms/?sort=file_last_update:${_sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew&locale=${locale}`
  );
  console.log(res.headers.get("content-length"));
  const data = await res.json();
  console.log("data REQUEST = ", data)
  return data;
};

export default getAllForms;
