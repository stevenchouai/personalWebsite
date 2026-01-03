import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use static export for GitHub Pages build, not in development
  // This allows API routes to work in development
  ...(process.env.NEXT_PUBLIC_BUILD_MODE === 'static' && {
    output: 'export',
  }),
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  
  // Empty turbopack config to silence the warning
  turbopack: {},
  
  // Don't use basePath or assetPrefix on Vercel
  // Only use them for GitHub Pages static deployment
};

export default nextConfig;
