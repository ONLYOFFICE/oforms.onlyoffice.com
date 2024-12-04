import CONFIG from "@config/config.json";

const getExtForms = async (locale, page, sort, pageSize, ext) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?sort=name_form:${sort}
    &_start=0
    ${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}
    &pagination[page]=${page}
    &locale=${locale === "pt" ? "pt-br" : locale}
    &filters[form_exts][ext][$eq]=${ext}
    &fields=name_form
    &fields=description_card
    &fields=url
    &populate[card_prewiew][fields]=url
    &populate[form_exts][fields]=ext
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getExtForms;
