import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  headers: async () => [
    {
      source: '/pdf.worker.min.js',
      headers: [
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
      ],
    },
  ],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};


export default nextConfig;
