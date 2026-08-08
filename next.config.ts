import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },

  // Fix Turbopack workspace root inference issues in some environments
  turbopack: {
    root: __dirname,
  },

  allowedDevOrigins: [
    "192.168.133.65:3000",
  ],
};



export default nextConfig;