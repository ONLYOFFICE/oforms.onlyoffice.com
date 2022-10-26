/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ], 
      }, 
    ]
  },
  reactStrictMode: true,
  i18n,
  images: {
    formats: ["image/webp"],
    domains: ["static-oforms.teamlab.info"],
  },
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;

