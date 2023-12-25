import CONFIG from "@config/config.json";

const getAllTypes = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/types/?locale=${locale}&populate=oforms`
  );
  const data = await res.json();
  data.data = data.data.filter(type => {
    console.log(type)
    return type.attributes.oforms.data.length !== 0
  })
  return data
};

export default getAllTypes;
