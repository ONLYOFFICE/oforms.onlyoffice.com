import CONFIG from "@config/config.json";

const getForm = async (locale, queryForm) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?filters[url][$eq]=${queryForm}
    &locale=${locale === "pt" ? "pt-br" : locale}
    &fields=seo_title
    &fields=seo_description
    &fields=name_form
    &fields=description_card
    &fields=url
    &fields=template_desc
    &populate[card_prewiew][fields]=url
    &populate[template_image][fields]=url
    &populate[form_exts][fields]=ext
    &populate[file_oform][fields]=name
    &populate[file_oform][fields]=size
    &populate[file_oform][fields]=updatedAt
    &populate[file_oform][fields]=url
    &populate[file_oform][fields]=hash
  `.replace(/\s+/g, "");
  
  const res = await fetch(`${CMSConfigAPI}/api/oforms/${params}`);
  const data = await res.json();
  return data;
};

export default getForm;