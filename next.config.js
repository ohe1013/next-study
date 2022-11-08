/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
}

module.exports = nextConfig
