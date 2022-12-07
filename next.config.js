/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    formats: ["image/webp"],
    domains: ["static-oforms.onlyoffice.com"],
  },
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
