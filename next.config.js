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
        source: '/ar',
        destination: '/',
        permanent: false,
      },
      {
        source: '/be',
        destination: '/',
        permanent: false,
      },
      {
        source: '/bg',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ca',
        destination: '/',
        permanent: false,
      },
      {
        source: '/cs',
        destination: '/',
        permanent: false,
      },
      {
        source: '/da',
        destination: '/',
        permanent: false,
      },
      {
        source: '/el',
        destination: '/',
        permanent: false,
      },
      {
        source: '/fi',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ga',
        destination: '/',
        permanent: false,
      },
      {
        source: '/gl',
        destination: '/',
        permanent: false,
      },
      {
        source: '/hi',
        destination: '/',
        permanent: false,
      },
      {
        source: '/hr',
        destination: '/',
        permanent: false,
      },
      {
        source: '/hu',
        destination: '/',
        permanent: false,
      },
      {
        source: '/hy',
        destination: '/',
        permanent: false,
      },
      {
        source: '/id',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ko',
        destination: '/',
        permanent: false,
      },
      {
        source: '/lo',
        destination: '/',
        permanent: false,
      },
      {
        source: '/lt',
        destination: '/',
        permanent: false,
      },
      {
        source: '/lv',
        destination: '/',
        permanent: false,
      },
      {
        source: '/nl',
        destination: '/',
        permanent: false,
      },
      {
        source: '/no',
        destination: '/',
        permanent: false,
      },
      {
        source: '/pt-PT',
        destination: '/pt',
        permanent: false,
      },
      {
        source: '/pl',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ro',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ru',
        destination: '/',
        permanent: false,
      },
      {
        source: '/si',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sk',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sl',
        destination: '/',
        permanent: false,
      }, 
      {
        source: '/sv',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sr',
        destination: '/',
        permanent: false,
      },
      {
        source: '/tr',
        destination: '/',
        permanent: false,
      },
      {
        source: '/uk',
        destination: '/',
        permanent: false,
      },
      {
        source: '/vi',
        destination: '/',
        permanent: false,
      },

    ]
  },
  reactStrictMode: false,
  i18n,
  images: {
    formats: ["image/webp"],
    domains: ["nextconfig_domains"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextconfig_domains.**',
      }
    ],
  },
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
