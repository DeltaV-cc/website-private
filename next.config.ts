import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/website-private',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
