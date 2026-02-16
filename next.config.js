/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gd.fitb.itb.ac.id', 'fttm.itb.ac.id'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gd.fitb.itb.ac.id',
        pathname: '/wp-content/**',
      },
    ],
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
}

module.exports = nextConfig