/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: false
  },
  experimental: {
    optimizeCss: true,
    serverActions: true
  }
}

module.exports = nextConfig