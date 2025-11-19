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
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/be',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/bg',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/ca',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/cs',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/da',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/el',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/fi',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/ga',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/gl',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/he',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/hi',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/hr',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/hu',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/hy',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/id',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/ko',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/lo',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/lt',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/lv',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/nl',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/no',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/pt-PT',
        destination: '/pt',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/pl',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/ro',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/ru',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/ru',
        destination: '/',
        permanent: false,
      },
      {
        source: '/si',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/sk',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/sl',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      }, 
      {
        source: '/sv',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/sr',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/tr',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/uk',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
      },
      {
        source: '/vi',
        destination: '/en',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'desktop',
            value: 'true',
          },
        ],
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
