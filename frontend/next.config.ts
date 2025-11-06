import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  async rewrites() {
    let baseUrl = process.env.NODE_ENV === 'development' ? process.env.NESTJS_API_URL_LOCAL : process.env.NESTJS_API_URL_PROD
    console.log(`baseUrl in rewrite: ${baseUrl}`);
    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/:path*`
      }
    ]
  },

  reactStrictMode: true
};

export default nextConfig;
