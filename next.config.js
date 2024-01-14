/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')()

const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
}

module.exports = withNextIntl(nextConfig)
