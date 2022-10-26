/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    protocol: 'https',
    path:"./_next/image",  
    formats: ["image/webp"],
    domains: ["static-oforms.teamlab.info"],
    
  },
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
