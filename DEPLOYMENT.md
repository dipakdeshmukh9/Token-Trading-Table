# Deployment Guide - Axiom Pulse

Complete step-by-step instructions for deploying Axiom Pulse to production.

## 📋 Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn package manager
- GitHub account for source control
- Vercel account for hosting

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/axiom-pulse.git
cd axiom-pulse

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

The app will automatically reload when you make changes.

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=

# Optional: Error Tracking
SENTRY_DSN=
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use a production server like PM2
npm install -g pm2
pm2 start npm --name "axiom-pulse" -- start
pm2 save
```

## ☁️ Deploying to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/axiom-pulse.git
git push -u origin main
```

2. Go to https://vercel.com/import
3. Select your GitHub repository
4. Configure project settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Set environment variables
6. Click "Deploy"

### Automatic Deployments

Every push to `main` branch will automatically deploy to Vercel. Check `.github/workflows/deploy.yml` for CI/CD configuration.

## 🎬 Creating a Demo Video (YouTube)

### Recording Steps:

1. **Setup Screen Recording**
   - Use OBS Studio (free) or ScreenFlow (Mac)
   - Set resolution: 1920x1080 @ 60fps
   - Test audio quality

2. **Demo Script** (~2 minutes):
   ```
   - Show Axiom Pulse homepage (0:00-0:10)
   - Demonstrate token categories (0:10-0:30)
   - Show real-time price updates (0:30-0:50)
   - Demonstrate sorting/filtering (0:50-1:10)
   - Show watchlist feature (1:10-1:30)
   - Display responsive design on mobile (1:30-1:50)
   - Show performance metrics (Lighthouse) (1:50-2:00)
   ```

3. **Recording Tips**:
   - Pause before clicking to show intent
   - Zoom in on important details
   - Explain features as you interact with them
   - Show smooth interactions and animations

4. **Post-Production**:
   - Edit in DaVinci Resolve (free) or Adobe Premiere
   - Add title card with logo
   - Add background music (royalty-free)
   - Add text overlays highlighting key features
   - Export as MP4 at 1080p/60fps

5. **Upload to YouTube**:
   - Create unlisted or public video
   - Add description with links to:
     - GitHub: https://github.com/yourusername/axiom-pulse
     - Live Demo: https://axiom-pulse.vercel.app
   - Add relevant tags: token, trading, next.js, react, dashboard
   - Create custom thumbnail

## 📸 Responsive Design Snapshots

### Testing Responsive Layout

Use Chrome DevTools to capture screenshots at different breakpoints:

```
- 320px (Mobile SE): `npm run screenshot:xs`
- 375px (iPhone 12): `npm run screenshot:sm`
- 640px (Tablet Portrait): `npm run screenshot:md`
- 768px (Tablet Landscape): `npm run screenshot:lg`
- 1024px (Desktop): `npm run screenshot:xl`
- 1280px+ (Large Desktop): `npm run screenshot:2xl`
```

To add these commands, update `package.json`:

```json
{
  "scripts": {
    "screenshot:xs": "playwright test --project chromium --grep '@responsive-xs'",
    "screenshot:sm": "playwright test --project chromium --grep '@responsive-sm'",
    "screenshot:md": "playwright test --project chromium --grep '@responsive-md'"
  }
}
```

### Create Auto-Layout Snapshots

Include in README's `RESPONSIVE_DESIGN.md`:

```markdown
# Responsive Design - Auto Layout Snapshots

## Mobile (320px)
![Mobile Layout](./screenshots/320px.png)
- Single column layout
- Full-width cards
- Stacked controls

## Tablet (768px)
![Tablet Layout](./screenshots/768px.png)
- 2-column grid
- Optimized spacing
- Touch-friendly buttons

## Desktop (1280px)
![Desktop Layout](./screenshots/1280px.png)
- 3-column grid
- Full feature set
- Hover interactions
```

## 📊 Performance Verification

### Lighthouse Score

```bash
# Run Lighthouse in CLI
npm install -g lighthouse

# Test mobile performance
lighthouse https://axiom-pulse.vercel.app --view

# Test desktop performance
lighthouse https://axiom-pulse.vercel.app --view --chrome-flags="--emulation-mobile=false"
```

Target scores:
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

### Core Web Vitals

```
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
```

## 🐛 Monitoring & Logging

### Sentry Integration (Optional)

```bash
npm install @sentry/nextjs

# Configure in next.config.ts
```

### Application Logs

- Check Vercel dashboard for runtime logs
- Use browser DevTools Console for client logs
- Monitor real-time updates in terminal

## 🔒 Security Checklist

- [ ] No hardcoded secrets in code
- [ ] Environment variables configured on Vercel
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers set up
- [ ] Dependencies updated to latest versions
- [ ] No console errors in production
- [ ] Input validation in place
- [ ] CSRF protection enabled

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Change port
npm run dev -- -p 3001
```

### Dependency Issues
```bash
# Clean install
rm package-lock.json node_modules
npm install --legacy-peer-deps
```

## 📱 iOS/Android Testing

### iOS (Safari)
1. Run on Mac with Xcode installed
2. Use iPhone Simulator
3. Test touch interactions

### Android
1. Use Chrome Remote Debugging
2. Test on real devices if possible
3. Check Mobile Chrome DevTools

## 🎯 Final Checklist

Before submitting your deliverables:

- [ ] GitHub repository pushed with clean commit history
- [ ] Vercel deployment live and accessible
- [ ] YouTube demo video uploaded (2 minutes max)
- [ ] README updated with deployment instructions
- [ ] Responsive design screenshots attached
- [ ] Lighthouse score ≥90 on mobile and desktop
- [ ] All interactive features working smoothly
- [ ] Real-time updates visible
- [ ] Loading states displaying correctly
- [ ] Error handling tested

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Review GitHub Actions workflow
3. Check browser console for errors
4. Test locally first before deploying

---

**Version**: 1.0.0  
**Last Updated**: December 2024
