/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost','127.0.0.1:8000'],
  },

}

module.exports = nextConfig
