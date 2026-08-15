import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },

  turbopack: {
    root: __dirname,
  },

  allowedDevOrigins: [
    "192.168.133.65:3000",
  ],
};



export default nextConfig;