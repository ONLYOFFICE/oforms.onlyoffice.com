const languages = require("./config/languages.json");
const availableLanguages = languages.map((el) => el.shortKey);

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: availableLanguages,
    localeDetection: true,
  },
};
