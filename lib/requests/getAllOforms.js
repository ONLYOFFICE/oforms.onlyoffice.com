import CONFIG from "@config/config.json";

const getAllOforms = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?locale=${locale === "pt" ? "pt-br" : locale}
    &pagination[pageSize]=1000
    &sort=createdAt:desc
    &fields=name_form
    &fields=description_card
    &fields=url
    &fields=popular_template
    &populate[card_prewiew][fields]=url
    &populate[form_exts][fields]=ext
    &populate[categories][fields]=urlReq
    &populate[types][fields]=urlReq
    &populate[compilations][fields]=urlReq
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getAllOforms;
