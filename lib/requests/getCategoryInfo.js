import CONFIG from "@config/config.json";

const getCategoryInfo = async (locale, urlReq, collectionTypePlural, categoryFieldName) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const params = `
    ?filters[urlReq][$eq]=${urlReq}
    &locale=${locale === "pt" ? "pt-br" : locale}
    &fields=seo_title
    &fields=seo_description
    &fields=header_description
    &fields=${categoryFieldName}
    &fields=urlReq
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/${collectionTypePlural}/${params}`);
  const data = await res.json();
  return data;
};

export default getCategoryInfo;
