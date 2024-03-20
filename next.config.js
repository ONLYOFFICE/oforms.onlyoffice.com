/** @type {import('next').NextConfig} */
const {i18n} = require("./next-i18next.config");

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
            },
            {
                source: '/be',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/bg',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/ca',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/cs',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/da',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/el',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/fi',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/ga',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/gl',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/hi',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/hr',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/hu',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/hy',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/id',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/ko',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/lo',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/lt',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/lv',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/nl',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/no',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/pt',
                destination: '/pt-BR',
                permanent: false,
            },
            {
                source: '/pt-PT',
                destination: '/pt',
                permanent: false,
            },
            {
                source: '/pl',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/ro',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/ru',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/si',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/sk',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/sl',
                destination: '/en',
                permanent: false,
            },            {
                source: '/sv',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/tr',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/uk',
                destination: '/en',
                permanent: false,
            },
            {
                source: '/vi',
                destination: '/en',
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
