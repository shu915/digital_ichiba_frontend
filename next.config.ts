import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Rails が立ってるポート
        pathname: '/rails/active_storage/**',
      },
    ],
  },
};

export default nextConfig;
