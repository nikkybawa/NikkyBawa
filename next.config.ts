import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site into out/ for upload to Hostinger's public_html.
  output: "export",
  // Every route becomes a directory with an index.html, which is what Apache
  // serves for a bare path like /about without any rewrite rules.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // No optimizer exists in a static export, so widths are pre-generated at
    // build time and resolved through this loader.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Kept in sync with WIDTHS in scripts/generate-image-variants.mjs.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 384],
  },
  experimental: {
    // Import only the icons/exports used instead of whole barrel files.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
