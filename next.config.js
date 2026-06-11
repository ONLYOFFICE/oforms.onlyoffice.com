/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    api: "modern-compiler",
    loadPaths: [path.join(__dirname, "src/styles")],
  },
  i18n,
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000 , must-revalidate",
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            // Instead of this value:
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/ru",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
