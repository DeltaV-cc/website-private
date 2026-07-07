import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/website-private',
  images: {
    unoptimized: true,
  },
  distDir: '.next',
  turbopack: {
    root: 'C:\\Users\\Admin\\DeltaV\\website',
  },
};

export default nextConfig;
