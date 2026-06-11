const { languages } = require("./src/config/languages");

module.exports = {
  i18n: {
    locales: languages.map((el) => el.shortKey),
    defaultLocale: "en",
    localeDetection: false,
  },
  showSupportNotice: false,
};
