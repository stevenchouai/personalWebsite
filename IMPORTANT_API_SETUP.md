# Important: API Routes Setup

## 🚨 Development vs Production

Your website has **two modes**:

### 1. **Development Mode** (with API routes)
- Full Next.js server with API routes
- Real-time market data from Yahoo Finance
- All features work perfectly

### 2. **Production Mode** (GitHub Pages - static)
- Static HTML export for GitHub Pages
- API routes DON'T work (GitHub Pages is static only)
- Need alternative solution for market data

## ✅ What I Fixed

### Changed `next.config.ts`
- Removed `output: 'export'` from development
- Only uses static export when building for GitHub Pages
- API routes now work in development!

### Added Build Scripts
```json
"dev": "next dev",                    // Development with API routes
"build": "next build",                // Normal build (with server)
"build:static": "... next build"      // Static build for GitHub Pages
```

## 🔄 Restart Required

**You need to restart your dev server for changes to take effect:**

1. Stop the current server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Visit: http://localhost:3000/tools/dca-calculator

## 🌐 For GitHub Pages Deployment

When deploying to GitHub Pages, you have **two options**:

### Option A: Client-Side Data Fetching (Recommended for Static)
- Fetch Yahoo Finance data directly from browser
- May have CORS issues
- Requires different implementation

### Option B: Pre-computed Data
- Calculate returns during build time
- Store in static JSON files
- No real-time updates

### Option C: Use External API Service
- Deploy API routes to Vercel/Netlify
- Keep static site on GitHub Pages
- API calls go to separate server

## 💡 Recommended Solution

**For your portfolio website, I recommend:**

### Development (Local)
✅ Use current setup with API routes
✅ Full functionality with real-time data
✅ Perfect for testing and showcasing

### Production (GitHub Pages)
Choose one:

1. **Deploy to Vercel instead** (Easiest)
   - Vercel supports API routes natively
   - Free tier available
   - One command: `vercel deploy`
   - All features work perfectly

2. **Hybrid approach**
   - Keep GitHub Pages for static content
   - Deploy API to Vercel
   - Update API calls to point to Vercel

3. **Static with fallback**
   - Use pre-computed data for popular assets
   - Show "Live data unavailable" message
   - Still functional, just not real-time

## 🚀 Quick Fix for Now

**To get it working immediately:**

```bash
# Stop current server (Ctrl+C)
# Then restart:
cd F:\2025project\personalWebsite\personal-website
npm run dev
```

The calculator should now work with real market data!

## 📝 Next Steps

1. **Test locally** - Make sure API routes work
2. **Decide on deployment** - Vercel vs GitHub Pages
3. **Adjust if needed** - Based on your choice

## 🎯 My Recommendation

**Use Vercel for deployment** because:
- ✅ Free tier (perfect for portfolio)
- ✅ API routes work out of the box
- ✅ Automatic deployments from GitHub
- ✅ Better performance than GitHub Pages
- ✅ Custom domains supported
- ✅ No configuration needed

You can still keep your GitHub repo public to show your code!

---

**Current Status:**
- ✅ Code is ready
- ✅ Config updated
- ⏳ Needs server restart
- ⏳ Deployment strategy decision needed

