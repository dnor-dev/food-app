/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    USERNAME: 'admin',
    PASSWORD: '1234',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
