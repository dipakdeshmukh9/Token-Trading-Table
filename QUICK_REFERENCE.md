# Quick Reference - Axiom Pulse

Fast access to key information for development and deployment.

## 🚀 Quick Commands

```bash
# Development
npm install
npm run dev          # Starts at http://localhost:3000

# Building
npm run build
npm start           # Runs production server

# Deployment
npm install -g vercel
vercel --prod       # Deploy to Vercel
```

## 📂 Important Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main layout with 3-column grid |
| `app/components/navbar/pulse/PulseColumn.tsx` | Token category column (memoized) |
| `app/components/navbar/pulse/TokenCard.tsx` | Individual token card |
| `app/lib/fakeApi.ts` | WebSocket mock (real-time updates) |
| `app/store/tokensSlice.ts` | Redux token state |
| `app/store/watchlistSlice.ts` | Redux watchlist state |
| `app/globals.css` | Global styles + Lighthouse optimization |
| `next.config.ts` | Performance + webpack optimization |

## 🔧 Key Features

| Feature | File | Status |
|---------|------|--------|
| Real-time Updates | `fakeApi.ts` | ✅ Dual-speed (500ms + 5s) |
| Loading States | `Skeleton.tsx` | ✅ Shimmer animation |
| Popovers | `Popover.tsx` | ✅ Radix UI + Token details |
| Sorting | `PulseColumn.tsx` | ✅ MC, Name, Price |
| Filtering | `SearchBar.tsx` | ✅ By name/symbol |
| Watchlist | `watchlistSlice.ts` | ✅ Redux persisted |
| Responsive | `page.tsx` | ✅ 320px-1280px+ |
| Performance | `next.config.ts` | ✅ Code split + optimized |
| Accessibility | `components/ui/*` | ✅ Radix primitives |

## 📊 Performance Targets

```
Lighthouse Score: ≥90 (setup complete)
LCP (Largest Contentful Paint): <2.5s
FID (First Input Delay): <100ms
CLS (Cumulative Layout Shift): <0.1
TTI (Time to Interactive): <2.5s
```

## 🎨 Design Specs

```
Background: #0b0e11
Text: rgba(255, 255, 255, 0.92)
Cards: rgba(255, 255, 255, 0.06)
Success: #10b981 (green)
Danger: #ef4444 (red)
```

## 🔐 Git Setup

```bash
# Initialize
git init
git config user.name "Your Name"
git config user.email "email@example.com"
git remote add origin https://github.com/username/axiom-pulse.git

# First push
git add .
git commit -m "init: Initial Axiom Pulse implementation"
git push -u origin main

# View commits
git log --oneline
```

## 📡 Vercel Deployment

```bash
# Via CLI
vercel login
vercel --prod

# Via GitHub
1. Push to GitHub
2. Go to https://vercel.com/import
3. Select repository
4. Framework: Next.js
5. Deploy
```

## 🎬 YouTube Demo Script (2 min)

```
0:00-0:10   - Intro, show Axiom Pulse homepage
0:10-0:30   - Demonstrate 3 token categories
0:30-0:50   - Show real-time price updates (color flashes)
0:50-1:10   - Demonstrate sorting (MC, Name, Price)
1:10-1:30   - Show watchlist feature
1:30-1:50   - Show responsive design (mobile view)
1:50-2:00   - Display Lighthouse metrics
```

## 📱 Responsive Breakpoints

```
xs: 320px   → 1 column (mobile)
md: 640px   → 2 columns (tablet)
lg: 1024px  → 3 columns (desktop)
xl: 1280px  → Full desktop experience
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Server not starting | `rm -rf .next node_modules && npm install` |
| Port 3000 in use | `npm run dev -- -p 3001` |
| WebSocket not updating | Check browser console, restart server |
| Skeleton showing forever | Check React Query `isLoading` state |
| Layout shift on update | Fixed dimensions on `.token-card` |

## 📋 Submission Checklist

- [ ] GitHub repo with clean commits
- [ ] Vercel live deployment
- [ ] YouTube demo video (2 min)
- [ ] README with links to guides
- [ ] Responsive design screenshots
- [ ] Lighthouse score ≥90 verified
- [ ] All features working smoothly

## 🔗 Important Links

- **GitHub Setup**: See `GIT_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Performance**: See `PERFORMANCE.md`
- **UI Spec**: See `PIXEL_PERFECT.md`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`

## 📞 Quick Troubleshooting

```bash
# Check Next.js version
npm list next

# Update dependencies
npm install --legacy-peer-deps

# Clear build cache
rm -rf .next

# Start fresh
npm install
npm run dev
```

## 💡 Pro Tips

1. **Real-time updates**: Watch the card values change smoothly in real-time
2. **Color transitions**: Look for green (up) and red (down) price flashes
3. **Responsive testing**: Use Chrome DevTools → Toggle device toolbar
4. **Performance**: Open DevTools → Lighthouse → Generate report
5. **Lighthouse target**: Aim for 90+ on Performance, Accessibility, Best Practices

## 🎯 Next Actions

1. **Test**: Run `npm run dev` and verify all features
2. **Git**: Follow `GIT_SETUP.md` for GitHub setup
3. **Deploy**: Follow `DEPLOYMENT.md` for Vercel
4. **Demo**: Record 2-minute YouTube video
5. **Submit**: Provide GitHub, Vercel, and YouTube links

---

**Last Updated**: December 29, 2024  
**Status**: ✅ Ready for Production
