import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/website-private',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: 'C:/Users/Admin/DeltaV/website',
  },
};

export default nextConfig;
