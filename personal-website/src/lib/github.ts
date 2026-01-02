/**
 * GitHub Data Utilities
 * Provides repository information and commit history
 */

export interface CommitData {
  sha: string;
  author: string;
  date: string;
  message: string;
  explanation?: string;
}

export interface LanguageData {
  name: string;
  size: number;
  percentage: number;
  color: string;
}

export interface RepositoryInfo {
  name: string;
  owner: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  createdAt: string;
  updatedAt: string;
}

// Repository information
export const repositoryInfo: RepositoryInfo = {
  name: "personalWebsite",
  owner: "stevenchouai",
  url: "https://github.com/stevenchouai/personalWebsite",
  description: "Personal website built with Next.js 16, showcasing projects and blog posts",
  stars: 0,
  forks: 0,
  createdAt: "2025-12-21T11:46:53Z",
  updatedAt: "2026-01-01T03:47:48Z",
};

// Language distribution
export const languages: LanguageData[] = [
  { name: "TypeScript", size: 27992, percentage: 87.6, color: "#3178c6" },
  { name: "CSS", size: 3098, percentage: 9.7, color: "#563d7c" },
  { name: "JavaScript", size: 559, percentage: 1.7, color: "#f1e05a" },
  { name: "MDX", size: 402, percentage: 1.0, color: "#fcb32c" },
];

// Commit history with detailed explanations
export const commits: CommitData[] = [
  {
    sha: "f7729e0",
    author: "stevenchouai",
    date: "2026-01-01T03:47:33Z",
    message: "添加部署状态检查指南并触发部署",
    explanation: "为了帮助用户验证GitHub Pages部署是否成功，添加了详细的检查指南文档。这个提交包含了如何查看部署状态、访问已部署网站以及排查常见问题的步骤说明。同时触发了新的部署流程以验证所有配置正确。"
  },
  {
    sha: "a78f528",
    author: "stevenchouai",
    date: "2026-01-01T02:48:24Z",
    message: "添加故障排查指南",
    explanation: "在多次部署失败后，创建了一个全面的故障排查文档（TROUBLESHOOTING.md）。这个文档详细记录了常见的部署问题、404错误的原因、以及如何修复路由配置问题。这对于未来维护和其他开发者理解项目配置非常有帮助。"
  },
  {
    sha: "b2ffede",
    author: "stevenchouai",
    date: "2026-01-01T02:47:21Z",
    message: "修复 Next.js 15+ 动态路由参数和仓库名配置",
    explanation: "这是一个关键的bug修复。Next.js 15引入了新的动态路由参数处理方式，需要使用Promise来处理params。同时修复了basePath配置，确保在GitHub Pages的子路径环境下所有资源都能正确加载。这个改动解决了之前部署后页面404的问题。"
  },
  {
    sha: "778d807",
    author: "stevenchouai",
    date: "2026-01-01T02:39:17Z",
    message: "添加部署指南文档",
    explanation: "创建了完整的部署指南（DEPLOYMENT_GUIDE.md），详细说明了如何将Next.js应用部署到GitHub Pages。包括静态导出配置、GitHub Actions工作流设置、以及部署后的验证步骤。这个文档使得部署流程标准化且可重复。"
  },
  {
    sha: "ea53d31",
    author: "stevenchouai",
    date: "2026-01-01T02:38:03Z",
    message: "配置 GitHub Pages 部署：添加静态导出配置和 GitHub Actions 工作流",
    explanation: "这是启用GitHub Pages部署的初始配置提交。在next.config.ts中添加了output: 'export'以生成静态HTML文件，并配置了basePath以支持GitHub Pages的子路径。同时创建了GitHub Actions工作流文件，实现了自动化的构建和部署流程。"
  },
  {
    sha: "ef5d889",
    author: "stevenchouai",
    date: "2025-12-21T15:16:41Z",
    message: "Merge branch 'main' of https://github.com/stevenchouai/personalWebsite",
    explanation: "合并远程仓库的更改到本地分支。这是在多个工作环境之间同步代码时的标准操作，确保本地和远程代码库保持一致。"
  },
  {
    sha: "a8b610a",
    author: "stevenchouai",
    date: "2025-12-21T15:13:53Z",
    message: "version0.1",
    explanation: "标记项目的第一个可用版本。这个版本包含了基本的个人网站结构，包括首页、简历页、博客系统和联系页面。使用Next.js 16和Tailwind CSS构建，采用了温暖的橙色主题设计。"
  },
  {
    sha: "1ab50ef",
    author: "stevenchouai",
    date: "2025-12-21T11:47:56Z",
    message: "first commit",
    explanation: "项目的初始提交，建立了基础的代码仓库结构。包含了Next.js项目的脚手架、基本配置文件、以及初始的README文档。这是整个项目的起点。"
  },
];

// Project statistics
export const projectStats = {
  totalCommits: commits.length,
  totalFiles: 13,
  linesOfCode: languages.reduce((sum, lang) => sum + lang.size, 0),
  contributors: 1,
};

// Technology stack
export const techStack = [
  { name: "Next.js", version: "16.1.0", category: "Framework" },
  { name: "React", version: "19.2.3", category: "Library" },
  { name: "TypeScript", version: "5", category: "Language" },
  { name: "Tailwind CSS", version: "4", category: "Styling" },
  { name: "MDX", version: "5.0.0", category: "Content" },
];
