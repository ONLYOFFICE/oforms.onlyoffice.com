import CONFIG from "@config/config.json";

const getExtForms = async (locale, page, sort, pageSize, ext) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?filters[form_exts][ext][$eq]=${ext}
    ${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}
    &pagination[page]=${page}
    &_start=0
    &locale=${locale === "pt" ? "pt-br" : locale}
    &sort=createdAt:${sort === "desc" ? "asc" : "desc"}
    &populate[card_prewiew][fields]=url
    &populate[form_exts][fields]=ext
    &fields=name_form
    &fields=description_card
    &fields=url
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getExtForms;
