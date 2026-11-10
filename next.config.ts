import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: no functions, middleware, ISR or image optimization.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
