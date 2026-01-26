import CONFIG from "@config/config.json";

const getCategoryForms = async (locale, sort, page, pageSize, urlReq, collectionTypePlural) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?filters[${collectionTypePlural}][urlReq][$eq]=${urlReq}
    &locale=${locale === "pt" ? "pt-br" : locale}
    ${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}
    &pagination[page]=${page}
    &sort=createdAt:${sort === "desc" ? "asc" : "desc"}
    &populate[card_prewiew][fields]=url
    &populate[form_exts][fields]=ext
    &fields=name_form
    &fields=url
    &fields=description_card
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getCategoryForms;
