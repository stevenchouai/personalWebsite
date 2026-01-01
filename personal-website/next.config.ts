import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出以支持 GitHub Pages
  images: {
    unoptimized: true,  // GitHub Pages 不支持 Next.js 图片优化
  },
  // 生产环境使用仓库名作为 basePath
  basePath: process.env.NODE_ENV === 'production' ? '/personalWebsite' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personalWebsite' : '',
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
