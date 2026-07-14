/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");

// When STATIC_BASE_PATH is set (see `npm run build:static`) the whole app is
// built to live under a sub-path on a separate static domain, e.g. /templates.
// It stays empty for the normal build, which is served from the domain root.
const staticBasePath = process.env.STATIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: false,
  ...(staticBasePath
    ? {
        basePath: staticBasePath,
        assetPrefix: staticBasePath,
        // getAssetUrl() prefixes public assets (favicons, images, font
        // preloads) with this; basePath does not touch those manual paths.
        env: { NEXT_PUBLIC_STATIC_URL: staticBasePath },
      }
    : {}),
  sassOptions: {
    api: "modern-compiler",
    loadPaths: [path.join(__dirname, "src/styles")],
  },
  i18n,
  async headers() {
    return [
      {
        // Per-locale catalog JSON for the embed (public/embed-data). Fetched
        // cross-origin by the desktop/DocSpace embed, so allow any origin.
        source: "/embed-data/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
        ],
      },
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
};

module.exports = nextConfig;
