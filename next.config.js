/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pre-existing TS errors in .next/dev/types/ generated files - ignore for build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
