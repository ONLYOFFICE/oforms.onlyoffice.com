/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 428, 640, 768, 1024, 1200, 1440, 1920, 2048, 3840],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
