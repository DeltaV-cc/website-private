import type { NextConfig } from "next";
import site from "./site.config.json";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: site.basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
