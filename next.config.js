const withTwin = require('./withTwin')

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locale: ['ko'],
    defaultLocale: 'ko',
  },
})

module.exports = nextConfig
