import CONFIG from "@config/config.json";

const getRandomForms = async (locale, formExt) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?locale=${locale === "pt" ? "pt-br" : locale}
    &pagination[pageSize]=7
    &pagination[page]=2
    &filters[form_exts][ext][$eq]=${formExt}
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

export default getRandomForms;