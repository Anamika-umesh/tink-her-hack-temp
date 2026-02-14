import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Disable static generation for pages using client-side navigation
  staticPageGenerationTimeout: 0,
};

export default nextConfig;
