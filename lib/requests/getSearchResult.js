import CONFIG from "@config/config.json";

const getSearchResult = async (locale, page, sort, pageSize, searchQuery, isDesktopClient) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchName = locale === "en" || locale === "fr" || locale === "pt" ? searchQuery?.toLowerCase() === "curriculum vitae" || searchQuery?.toLowerCase() === "curriculum" || searchQuery?.toLowerCase() === "vitae" ? "cv" : searchQuery : searchQuery;
  const params = `
    ?sort=name_form:${sort}
    ${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}
    &pagination[page]=${page}
    &locale=${locale === "pt" ? "pt-br" : locale}
    &filters[name_form][$containsi]=${searchName}
    &fields=name_form
    &fields=url
    &populate[form_exts][fields]=ext
    &populate[card_prewiew][fields]=url
    ${isDesktopClient ? `
      &fields=template_desc
      &populate[file_oform][fields]=name
      &populate[file_oform][fields]=size
      &populate[file_oform][fields]=url
      &populate[file_oform][fields]=ext
    ` :
      "&fields=description_card"
    }
  `.replace(/\s+/g, "");
  
  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getSearchResult;