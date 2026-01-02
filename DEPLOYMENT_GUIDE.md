# 🚀 部署指南 - 快速启用 GitHub Pages

## ✅ 已完成的步骤

1. ✅ 配置 Next.js 支持静态导出
2. ✅ 创建 GitHub Actions 自动部署工作流
3. ✅ 代码已推送到 GitHub

## 📝 接下来需要做的（重要！）

### 步骤 1：启用 GitHub Pages

1. 打开你的 GitHub 仓库：
   ```
   https://github.com/stevenchouai/personalWebsite
   ```

2. 点击仓库顶部的 **Settings**（设置）标签

3. 在左侧菜单中找到并点击 **Pages**

4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
   
5. 保存设置（如果有保存按钮的话）

### 步骤 2：等待部署完成

1. 回到仓库主页，点击 **Actions** 标签
   ```
   https://github.com/stevenchouai/personalWebsite/actions
   ```

2. 你会看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行

3. 点击进去查看详细进度

4. 等待 2-5 分钟，直到看到绿色的 ✓ 标志

### 步骤 3：访问你的网站

部署成功后，你的网站地址是：
```
https://stevenchouai.github.io/personalWebsite
```

🎉 恭喜！你的个人网站已经上线了！

---

## 🔧 可能需要的额外配置

### 如果 Actions 权限不足

如果部署失败，可能需要设置 Actions 权限：

1. 进入 **Settings** → **Actions** → **General**
2. 滚动到 **Workflow permissions**
3. 选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 点击 **Save**

然后重新运行工作流：
- 进入 **Actions** 标签
- 点击失败的工作流
- 点击右上角的 **Re-run all jobs**

---

## 📱 如何更新网站内容

以后每次修改代码后，只需要：

```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Actions 会自动重新构建和部署！

---

## 🎨 自定义你的网站

### 修改个人信息
编辑 `personal-website/src/lib/site.ts` 文件

### 添加博客文章
在 `personal-website/content/blog/` 目录下创建新的 `.mdx` 文件

### 修改样式
编辑 `personal-website/src/app/globals.css` 或组件文件

---

## ❓ 常见问题

### Q: 网站样式错乱或 404？
A: 检查 `next.config.ts` 中的 `basePath` 是否设置为 `/personalWebsite`（你的仓库名）

### Q: 如何查看部署日志？
A: 访问 https://github.com/stevenchouai/personalWebsite/actions

### Q: 如何本地预览？
A: 
```bash
cd personal-website
npm run dev
```
然后访问 http://localhost:3000

---

## 📚 更多资源

- 完整教程：查看 `GITHUB_PAGES_TUTORIAL.md`
- GitHub Pages 文档：https://docs.github.com/en/pages
- Next.js 文档：https://nextjs.org/docs

---

**需要帮助？** 查看 Actions 的错误日志或提 Issue！


