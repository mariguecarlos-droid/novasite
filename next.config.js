/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Garante que o trailing slash seja tratado corretamente na Hostinger
  trailingSlash: true,
};

module.exports = nextConfig;
