import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NESTJS_API_URL_PROD}/:path*`
      }
    ]
  },

  reactStrictMode: true
};

export default nextConfig;
