import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  basePath: '/projects/quran-player',
  assetPrefix: '/projects/quran-player',
  images: {
    path: '/projects/quran-player/_next/image'
  },
  publicRuntimeConfig: {
    basePath: '/projects/quran-player',
  },
  trailingSlash: true,
};

export default nextConfig;
