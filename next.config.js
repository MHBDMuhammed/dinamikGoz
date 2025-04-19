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
  output: 'export',
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    return config;
  }
}

module.exports = nextConfig 