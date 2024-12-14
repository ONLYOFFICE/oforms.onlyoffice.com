import CONFIG from "@config/config.json";

const getDesktopMoreForms = async (locale, sort, page) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?sort=name_form:${sort}
    &pagination[pageSize]=32
    &pagination[page]=${page}
    &populate=template_image
    &populate=file_oform
    &populate=card_prewiew
    &populate=categories
    &populate=form_exts
    &locale=${locale === "pt" ? "pt-br" : locale}
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();

  return data;
};

export default getDesktopMoreForms;