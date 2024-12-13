import CONFIG from "@config/config.json";

const getPopularTemplates = async (locale, sort) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?sort=name_form:${sort}
    &_start=0
    &_limit=-1
    &locale=${locale === "pt" ? "pt-br" : locale}
    &filters[popular_template][$eq]=true
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

export default getPopularTemplates;