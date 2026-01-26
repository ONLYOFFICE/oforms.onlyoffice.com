import CONFIG from "@config/config.json";

const getSearchResult = async (locale, page, sort, pageSize, searchQuery) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchName = locale === "en" || locale === "fr" || locale === "pt" ? searchQuery?.toLowerCase() === "curriculum vitae" || searchQuery?.toLowerCase() === "curriculum" || searchQuery?.toLowerCase() === "vitae" ? "cv" : searchQuery : searchQuery;
  const params = `
    ?filters[name_form][$containsi]=${encodeURIComponent(searchName)}
    ${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}
    &pagination[page]=${page}
    &locale=${locale === "pt" ? "pt-br" : locale}
    &sort=createdAt:${sort === "desc" ? "asc" : "desc"}
    &populate[form_exts][fields]=ext
    &populate[card_prewiew][fields]=url
    &fields=name_form
    &fields=url
    &fields=description_card
  `.replace(/\s+/g, "");
  
  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getSearchResult;