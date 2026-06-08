const CMS_LOCALE_MAP = {
  pt: "pt-br",
  zh: "zh-CN",
};

const cmsLocale = (locale) => CMS_LOCALE_MAP[locale] ?? locale;

export default cmsLocale;
