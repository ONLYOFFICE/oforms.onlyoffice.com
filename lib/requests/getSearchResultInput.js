import CONFIG from "@config/config.json";

const getSearchResultInput = async (locale, searchQuery) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchName = locale === "en" || locale === "fr" || locale === "pt" ? searchQuery?.toLowerCase() === "curriculum vitae" || searchQuery?.toLowerCase() === "curriculum" || searchQuery?.toLowerCase() === "vitae" ? "cv" : searchQuery : searchQuery;
  const params = `
    ?sort=name_form:asc
    &locale=${locale === "pt" ? "pt-br" : locale}
    &filters[name_form][$containsi]=${searchName}
    &pagination[pageSize]=5
  `.replace(/\s+/g, "");
  
  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getSearchResultInput;