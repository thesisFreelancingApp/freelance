/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
    domains: ['straitwebsolutions.com', 'fiverr-res.cloudinary.com'],
  },
};

module.exports = nextConfig;
