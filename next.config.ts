import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/website-private',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
