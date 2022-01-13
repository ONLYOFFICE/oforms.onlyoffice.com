const languages = require("./languages.json");

const availableLanguages = languages.map((el) => el.shortKey);

const { defaultLanguage } = require("./static/data/config.json");

module.exports = {
  proxy: {
    prefix: "/post.ashx",
    url: "https://www.onlyoffice.com",
  },
  plugins: [
    { resolve: "gatsby-plugin-styled-components" },
    { resolve: "gatsby-plugin-image" },
    { resolve: "gatsby-plugin-sharp" },
    { resolve: "gatsby-transformer-sharp" },
    { resolve: "gatsby-plugin-react-helmet" },
    { resolve: "gatsby-transformer-json" },
    { resolve: "gatsby-plugin-use-query-params" },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./static/images/logo/favicon_general.png",
      },
    },
    { resolve: "gatsby-transformer-remark" },
    { resolve: "gatsby-plugin-mdx" },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./static/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "def",
        path: "./static/data",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "locale",
        path: "./src/locales",
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages: availableLanguages,
        defaultLanguage,
        redirect: true,
        generateDefaultLanguagePage: "/en",
        i18nextOptions: {
          fallbackLng: defaultLanguage,

          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Open Sans:200,300,400,400i,500,600,700,800"],
      },
    },
    {
      resolve: "gatsby-plugin-portal",
      options: {
        key: "portal",
        id: "portal",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.react.svg$/,
        },
      },
    },
  ],
};
