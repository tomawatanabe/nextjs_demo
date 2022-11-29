/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: "/api/stock",
        destination: "http://localhost:8000/stock",
      },
      {
        source: "/api/stock/:slug",
        destination: "http://localhost:8000/stock/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
