import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use static export for GitHub Pages build, not in development
  // This allows API routes to work in development
  ...(process.env.NEXT_PUBLIC_BUILD_MODE === 'static' && {
    output: 'export',
  }),
  images: {
    unoptimized: true,  // GitHub Pages 不支持 Next.js 图片优化
  },
  // 生产环境使用仓库名作为 basePath
  basePath: process.env.NODE_ENV === 'production' ? '/personalWebsite' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personalWebsite' : '',
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  
  // Use webpack instead of turbopack for builds
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
