import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
