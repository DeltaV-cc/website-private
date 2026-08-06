import type { NextConfig } from "next";
import site from "./site.config.json";

/**
 * Production (GitHub Pages): basePath `/website-private`.
 * Local `next dev`: empty basePath so http://localhost:3001/forge/ works
 * (the #1 source of “site is buggy / page not found”).
 * Override: LOCAL_BASEPATH=1 to force production basePath while developing.
 */
const useProdBasePath =
  process.env.NODE_ENV === "production" || process.env.LOCAL_BASEPATH === "1";
const basePath = useProdBasePath ? site.basePath : "";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted on this package (avoid parent C:\Users\Admin\package-lock.json)
  turbopack: { root: process.cwd() },
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
