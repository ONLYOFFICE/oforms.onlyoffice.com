import CONFIG from "@config/config.json";

const getCmsImageUrl = (url) => {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const base = CONFIG.api.cms || "";
  return `${base}${url}`;
};

export default getCmsImageUrl;
