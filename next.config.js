/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: false
  },
  experimental: {
    optimizeCss: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig