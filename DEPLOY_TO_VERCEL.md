# 🚀 部署到 Vercel 指南

## 为什么选择 Vercel？

✅ **API 路由支持** - DCA 计算器需要服务器端 API
✅ **免费套餐** - 个人项目完全免费
✅ **自动部署** - 推送到 GitHub 自动部署
✅ **全球 CDN** - 快速访问
✅ **HTTPS** - 自动 SSL 证书
✅ **自定义域名** - 支持绑定域名

## 🎯 快速部署（3分钟）

### 方法 1: 通过 Vercel 网站（最简单）

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 点击 "Sign Up" 或 "Login"

2. **使用 GitHub 登录**
   - 选择 "Continue with GitHub"
   - 授权 Vercel 访问你的 GitHub

3. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择 `personalWebsite` 仓库
   - 点击 "Import"

4. **配置项目**
   ```
   Framework Preset: Next.js
   Root Directory: personal-website
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

5. **部署**
   - 点击 "Deploy"
   - 等待 2-3 分钟
   - 完成！🎉

### 方法 2: 通过命令行

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 进入项目目录
cd F:\2025project\personalWebsite\personal-website

# 4. 部署
vercel

# 5. 按照提示操作
# - Set up and deploy? Yes
# - Which scope? 选择你的账户
# - Link to existing project? No
# - What's your project's name? personal-website
# - In which directory is your code located? ./
# - Want to override the settings? No

# 6. 生产部署
vercel --prod
```

## 📝 重要配置

### Root Directory
确保设置为 `personal-website`（因为你的 Next.js 项目在子目录）

### 环境变量（如果需要）
目前不需要，但将来如果需要：
```
Settings → Environment Variables
```

### 构建设置
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## 🌐 部署后

### 你会得到
- **预览 URL**: `https://personal-website-xxx.vercel.app`
- **生产 URL**: `https://personal-website-stevenchouai.vercel.app`

### 自动部署
- 每次推送到 `main` 分支自动部署
- Pull Request 自动创建预览

### 访问你的计算器
```
https://你的域名.vercel.app/tools/dca-calculator
```

## 📱 在手机上测试

1. 部署完成后，获取 Vercel URL
2. 在手机浏览器打开
3. 测试所有功能：
   - ✅ 资产选择
   - ✅ 输入框
   - ✅ 图表显示
   - ✅ 搜索功能
   - ✅ 触摸反馈

## 🔧 故障排除

### 构建失败
```bash
# 本地测试构建
cd personal-website
npm run build

# 如果成功，推送到 GitHub
git push origin main
```

### API 路由不工作
- 确保使用 `npm run build`（不是 `build:static`）
- 检查 `next.config.ts` 没有 `output: 'export'`

### 404 错误
- 确保 Root Directory 设置为 `personal-website`
- 检查路由路径是否正确

## 🎨 自定义域名（可选）

### 添加域名
1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的域名
4. 按照说明配置 DNS

### 示例
```
www.你的域名.com → Vercel
你的域名.com → Vercel
```

## 📊 性能监控

### Vercel Analytics
- 免费的性能监控
- 实时访问统计
- Core Web Vitals

启用方法：
1. Project Settings → Analytics
2. Enable Analytics
3. 添加到代码（可选）

## 🔄 持续部署

### 自动化流程
```
本地开发 → Git Commit → Git Push → 自动部署
```

### 分支策略
- `main` 分支 → 生产环境
- 其他分支 → 预览环境

## 💡 最佳实践

### 1. 使用环境变量
```javascript
// 不要硬编码 API 密钥
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

### 2. 优化构建
```json
// package.json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

### 3. 监控性能
- 使用 Vercel Analytics
- 检查 Core Web Vitals
- 优化加载时间

## 🎯 下一步

### 部署后
1. ✅ 测试所有功能
2. ✅ 在手机上测试
3. ✅ 分享给朋友
4. ✅ 添加到简历

### 可选增强
1. 自定义域名
2. 添加 Analytics
3. 设置 SEO
4. 添加 OG 图片

## 📞 获取帮助

### Vercel 文档
- https://vercel.com/docs
- https://vercel.com/docs/frameworks/nextjs

### 社区
- Vercel Discord
- GitHub Discussions
- Stack Overflow

## ✅ 检查清单

部署前：
- [x] 代码已推送到 GitHub
- [x] 本地构建成功
- [x] API 路由测试通过
- [x] 移动端优化完成

部署后：
- [ ] 访问 Vercel URL
- [ ] 测试计算器功能
- [ ] 在手机上测试
- [ ] 检查 API 路由
- [ ] 验证数据加载

## 🎉 完成！

一旦部署完成，你的 DCA 计算器将：

✅ **全球可访问** - 任何人都可以使用
✅ **自动更新** - 推送代码自动部署
✅ **快速加载** - 全球 CDN
✅ **安全连接** - HTTPS
✅ **移动端优化** - 完美的手机体验

---

**准备好了吗？开始部署吧！** 🚀

```bash
vercel login
cd personal-website
vercel --prod
```

