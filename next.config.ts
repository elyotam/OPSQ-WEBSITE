import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds the GitHub Pages version: plain files under NEXT_BASE_PATH, no server.
// The Pages workflow removes the API route and middleware first, since export can't include them.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Lets a production build run next to `next dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  ...(staticExport && {
    output: "export",
    basePath: process.env.NEXT_BASE_PATH || "",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
