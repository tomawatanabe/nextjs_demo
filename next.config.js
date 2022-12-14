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
      {
        source: "/api/shoppingCart",
        destination: "http://localhost:8000/shoppingCart",
      },
      {
        source: "/api/shoppingCart/:slug",
        destination: "http://localhost:8000/shoppingCart/:slug",
      },
      {
        source: "/api/order",
        destination: "http://localhost:8000/order",
      },
      {
        source: "/api/order/:slug",
        destination: "http://localhost:8000/order/:slug",
      },
      {
        source: "/api/users",
        destination: "http://localhost:8000/users",
      },
      {
        source: "/api/users/:slug",
        destination: "http://localhost:8000/users/:slug",
      },
      {
        source: "/api/favoriteItems",
        destination: "http://localhost:8000/favoriteItems",
      },
      {
        source: "/api/favoriteItems/:slug",
        destination: "http://localhost:8000/favoriteItems/:slug",
      },
      {
        source: "/api/items",
        destination: "http://localhost:8000/items",
      },
      {
        source: "/api/items/:slug",
        destination: "http://localhost:8000/items/:slug",
      },
      {
        source: "/api/usedItems",
        destination: "http://localhost:8000/usedItems",
      },
      {
        source: "/api/items/:slug",
        destination: "http://localhost:8000/items/:slug",
      },
      {
        source: "/api/items",
        destination: "http://localhost:8000/items",
      },
    ];
  },
};

module.exports = nextConfig;
