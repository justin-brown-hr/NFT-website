import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — required for IPFS / Unstoppable Domains
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimizer needs a server; disable for static/IPFS hosting
    unoptimized: true,
  },
  // Allow accessing the dev server via this host/IP (not just localhost)
  allowedDevOrigins: ["82.26.94.97"],
};

export default nextConfig;
