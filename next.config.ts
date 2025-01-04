import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/projects/quran-player" : "",
  assetPrefix: isProd ? "/projects/quran-player" : "",
};

export default nextConfig;
