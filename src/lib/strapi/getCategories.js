import CONFIG from "@config/config.json";

const getCategories = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/categories/?locale=${locale}&populate=oforms`
  );
  const data = await res.json();
  data.data = data.data.filter(category => {
    return category.attributes.oforms.data.length !== 0
  })
  return data;
};

export default getCategories;
