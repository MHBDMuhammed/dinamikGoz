/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: false
  },
  eslint: {
    ignoreDuringBuilds: true,
    rules: {
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
}

module.exports = nextConfig