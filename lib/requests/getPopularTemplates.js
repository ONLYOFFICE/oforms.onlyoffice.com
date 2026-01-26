import CONFIG from "@config/config.json";

const getPopularTemplates = async (locale, ext, urlReq, collectionTypePlural) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?filters[popular_template][$eq]=true
    ${ext ? `&filters[form_exts][ext][$eq]=${ext}` : urlReq && collectionTypePlural ? `&filters[${collectionTypePlural}][urlReq][$eq]=${urlReq}` : ""}
    &_start=0
    &locale=${locale === "pt" ? "pt-br" : locale}
    &sort=createdAt:desc
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

export default getPopularTemplates;