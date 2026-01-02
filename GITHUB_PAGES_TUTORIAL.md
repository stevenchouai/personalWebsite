# 使用 GitHub Pages 搭建个人网站教程

## 📖 目录
1. [什么是 GitHub Pages](#什么是-github-pages)
2. [准备工作](#准备工作)
3. [部署步骤](#部署步骤)
4. [访问你的网站](#访问你的网站)
5. [常见问题](#常见问题)

---

## 什么是 GitHub Pages

GitHub Pages 是 GitHub 提供的免费静态网站托管服务，可以让你：
- ✅ 免费托管静态网站
- ✅ 获得 `https://你的用户名.github.io/仓库名` 格式的网址
- ✅ 自动部署（推送代码后自动更新网站）
- ✅ 支持自定义域名

---

## 准备工作

### 1. 安装必要工具
- ✅ Git（用于版本控制）
- ✅ Node.js 和 npm（已安装）
- ✅ GitHub 账号

### 2. 检查 Git 是否安装
打开终端/命令行，运行：
```bash
git --version
```

如果没有安装，请访问：https://git-scm.com/downloads

### 3. 配置 Git（首次使用需要）
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

---

## 部署步骤

### 步骤 1：创建 GitHub 仓库

1. 登录 GitHub：https://github.com
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**: `personal-website`（或其他你喜欢的名字）
   - **Description**: "我的个人网站"
   - **Public**（必须选择 Public）
   - ❌ 不要勾选 "Add a README file"
4. 点击 `Create repository`

### 步骤 2：配置 Next.js 项目以支持静态导出

由于 GitHub Pages 只支持静态网站，我们需要配置 Next.js 进行静态导出。

#### 2.1 修改 `next.config.ts`
添加静态导出配置：
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true,  // GitHub Pages 不支持图片优化
  },
  basePath: process.env.NODE_ENV === 'production' ? '/personal-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-website' : '',
};

export default nextConfig;
```

**注意**：将 `/personal-website` 替换为你的 GitHub 仓库名。

#### 2.2 修改 `package.json`
添加部署脚本：
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "export": "next build"
  }
}
```

### 步骤 3：创建 GitHub Actions 工作流

创建 `.github/workflows/deploy.yml` 文件，实现自动部署：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 当推送到 main 分支时触发

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: './personal-website/package-lock.json'

      - name: Install dependencies
        working-directory: ./personal-website
        run: npm ci

      - name: Build
        working-directory: ./personal-website
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./personal-website/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 4：初始化 Git 并推送到 GitHub

在项目根目录（`F:\2025project\personalWebsite`）打开终端，运行：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "Initial commit: Personal website"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 5：启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 `Settings`（设置）
2. 在左侧菜单找到 `Pages`
3. 在 **Source** 下拉菜单中选择 `GitHub Actions`
4. 保存设置

### 步骤 6：等待部署完成

1. 回到仓库主页，点击 `Actions` 标签
2. 你会看到一个正在运行的工作流
3. 等待几分钟，直到显示绿色的 ✓
4. 部署完成！

---

## 访问你的网站

部署成功后，你的网站地址是：
```
https://你的用户名.github.io/personal-website
```

例如，如果你的 GitHub 用户名是 `zhangsan`，网址就是：
```
https://zhangsan.github.io/personal-website
```

---

## 常见问题

### Q1: 推送代码时要求输入用户名和密码？
**A**: GitHub 已不再支持密码认证，需要使用 Personal Access Token（个人访问令牌）。

**解决方法**：
1. 访问：https://github.com/settings/tokens
2. 点击 `Generate new token` → `Generate new token (classic)`
3. 勾选 `repo` 权限
4. 生成 token 并复制（只显示一次！）
5. 推送时，用户名填 GitHub 用户名，密码填这个 token

或者使用 SSH 方式（推荐）：
```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "你的邮箱@example.com"

# 复制公钥内容
cat ~/.ssh/id_ed25519.pub

# 在 GitHub Settings → SSH and GPG keys 中添加
```

然后修改远程仓库地址：
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/personal-website.git
```

### Q2: 网站样式错乱或图片不显示？
**A**: 检查 `next.config.ts` 中的 `basePath` 和 `assetPrefix` 是否正确设置为你的仓库名。

### Q3: 如何更新网站内容？
**A**: 修改代码后，只需：
```bash
git add .
git commit -m "更新内容"
git push
```
GitHub Actions 会自动重新部署。

### Q4: 想要自定义域名？
**A**: 
1. 购买域名（如 `yourname.com`）
2. 在域名提供商处添加 CNAME 记录指向 `你的用户名.github.io`
3. 在 GitHub 仓库的 `Settings` → `Pages` → `Custom domain` 填入你的域名
4. 在 `personal-website/public` 目录下创建 `CNAME` 文件，内容为你的域名

### Q5: 部署失败怎么办？
**A**: 
1. 检查 `Actions` 标签页的错误日志
2. 确保 `Settings` → `Actions` → `General` → `Workflow permissions` 设置为 "Read and write permissions"
3. 确保项目能在本地成功构建：`npm run build`

---

## 🎉 恭喜！

你已经成功使用 GitHub Pages 搭建了个人网站！

### 下一步可以做什么？
- 📝 添加更多博客文章到 `content/blog/`
- 🎨 自定义样式和布局
- 📊 添加 Google Analytics 统计访问量
- 💬 添加评论系统（如 Giscus）
- 🔍 优化 SEO

---

## 📚 参考资源
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Git 教程](https://git-scm.com/book/zh/v2)

---

**需要帮助？** 欢迎提 Issue 或联系我！


