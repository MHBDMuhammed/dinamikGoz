/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export'
}

module.exports = nextConfig