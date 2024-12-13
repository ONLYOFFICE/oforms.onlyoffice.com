import CONFIG from "@config/config.json";

const getCategoryForms = async (locale, sort, page, pageSize, urlReq, collectionTypePlural, isDesktopClient) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?filters[${collectionTypePlural}][urlReq][$eq]=${urlReq}
    &locale=${locale === "pt" ? "pt-br" : locale}
    &sort=name_form:${sort}
    ${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}
    &pagination[page]=${page}
    &fields=name_form
    &fields=url
    &populate[card_prewiew][fields]=url
    &populate[form_exts][fields]=ext
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

export default getCategoryForms;
