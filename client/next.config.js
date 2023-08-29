/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  distDir: "../server/out",
};

module.exports = nextConfig;
