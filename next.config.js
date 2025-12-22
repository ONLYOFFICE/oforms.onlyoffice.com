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
            value: 'public, max-age=31536000 , must-revalidate',
          }
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
            value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
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
        source: '/ru',
        destination: '/',
        permanent: false,
      },
    ]
  },
  reactStrictMode: false,
  i18n,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextconfig_domains.**',
        pathname: '/**',
      }
    ],
  },
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
