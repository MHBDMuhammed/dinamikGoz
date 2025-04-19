/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig