import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  serverExternalPackages: ['firebase'],
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false }
};

export default nextConfig;
