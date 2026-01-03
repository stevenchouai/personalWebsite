# 快速启动指南

## 🚀 启动开发服务器

### Windows PowerShell

```powershell
cd personal-website
npm run dev
```

### 访问网站

开发服务器启动后，访问：

```
http://localhost:3000
```

或者如果端口被占用，会自动使用下一个可用端口（如 3001）

---

## 🎨 查看更新内容

### 1. 蓝白主题
- 打开首页查看新的天蓝色主题
- 注意按钮、链接和强调色都已改为蓝色
- 背景渐变效果也更新为蓝色系

### 2. 联系信息
- **页脚** - 查看 CSDN 博客链接和新邮箱
- **简历页面** (`/resume`) - 查看完整的联系方式
- **联系页面** (`/contact`) - 查看邮箱表单

### 3. 功能页面（Manus AI 实现）
- **Projects 页面** (`/projects`) - GitHub 仓库统计
- **Commits 页面** (`/commits`) - 详细的提交历史

---

## 📝 页面导航

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 个人简介和快速导航 |
| 简历 | `/resume` | 工作经验和技能 |
| 博客 | `/blog` | 技术文章（MDX） |
| Projects | `/projects` | 项目统计和技术栈 |
| Commits | `/commits` | 开发历史时间轴 |
| 联系 | `/contact` | 联系表单 |

---

## 🛠️ 开发命令

```powershell
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

---

## 📦 项目结构

```
personal-website/
├── src/
│   ├── app/              # Next.js 页面
│   │   ├── page.tsx      # 首页
│   │   ├── globals.css   # 全局样式（主题色）
│   │   ├── blog/         # 博客页面
│   │   ├── commits/      # Commits 页面
│   │   ├── contact/      # 联系页面
│   │   ├── projects/     # Projects 页面
│   │   └── resume/       # 简历页面
│   ├── components/       # React 组件
│   │   ├── Nav.tsx       # 导航栏
│   │   ├── Footer.tsx    # 页脚
│   │   ├── CardLink.tsx  # 卡片链接
│   │   └── Container.tsx # 容器组件
│   └── lib/              # 工具函数
│       ├── site.ts       # 站点配置
│       ├── github.ts     # GitHub 数据
│       └── blog.ts       # 博客工具
├── content/
│   └── blog/             # MDX 博客文章
└── public/               # 静态资源
```

---

## 🎨 主题自定义

主题色定义在 `src/app/globals.css` 中：

```css
:root {
  --background: #f0f9ff;    /* 页面背景 */
  --accent: #0ea5e9;        /* 主强调色 */
  --accent-2: #0284c7;      /* 次强调色 */
  --card-2: #e0f2fe;        /* 卡片背景 */
}
```

修改这些变量即可改变整个网站的主题色。

---

## 📚 相关文档

- **THEME_UPDATE_SUMMARY.md** - 主题更新详细说明
- **SUMMARY.md** - Manus AI 的功能实现文档
- **DEPLOYMENT_GUIDE.md** - GitHub Pages 部署指南
- **TROUBLESHOOTING.md** - 常见问题排查

---

## 💡 提示

1. **热重载** - 修改代码后，浏览器会自动刷新
2. **移动端预览** - 使用浏览器开发者工具查看响应式效果
3. **主题调试** - 使用浏览器检查器查看 CSS 变量值

---

**祝您开发愉快！** 🎉


