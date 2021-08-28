/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn11.bigcommerce.com'],
  },
  env: {
    BIGCOMMERCE_STORE_HASH: process.env.BIGCOMMERCE_STORE_HASH,
    BIGCOMMERCE_ACCESS_TOKEN: process.env.BIGCOMMERCE_ACCESS_TOKEN,
  },
};
