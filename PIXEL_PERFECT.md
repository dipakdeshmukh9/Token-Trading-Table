# Pixel-Perfect UI Matching Guide

This document tracks pixel-perfect alignment with Axiom Trade's design.

## Visual Regression Testing

### Color Scheme
```css
/* Background */
Primary: #0b0e11 (dark background)
Secondary: rgba(255, 255, 255, 0.06) (subtle cards)

/* Text Colors */
Foreground: rgba(255, 255, 255, 0.92) (main text)
Secondary: rgba(255, 255, 255, 0.6) (labels)
Muted: rgba(255, 255, 255, 0.4) (hints)
Disabled: rgba(255, 255, 255, 0.2) (disabled state)

/* Status Colors */
Success: #10b981 (green - positive)
Danger: #ef4444 (red - negative)
Warning: #f59e0b (orange - caution)
Info: #3b82f6 (blue - information)
```

### Typography
```css
/* Font Family */
Primary: Inter, system-ui, -apple-system

/* Sizes */
H1: 32px / 40px (token name)
H2: 24px / 32px (section title)
H3: 18px / 28px (card title)
Body: 14px / 22px (content)
Small: 12px / 18px (labels)
Xs: 10px / 16px (hints)

/* Weights */
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

### Spacing
```css
/* Base unit: 4px */
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 12px (0.75rem)
lg: 16px (1rem)
xl: 24px (1.5rem)
2xl: 32px (2rem)
```

### Component Dimensions

#### Token Card
```
Size: Full column width minus gutters
Height: 96px (fixed)
Border Radius: 8px (lg)
Border: 1px solid rgba(255, 255, 255, 0.06)
Padding: 10px
Gap: 6px
```

#### Buttons
```
Primary Button:
- Height: 32px
- Padding: 8px 12px
- Border Radius: 6px
- Font Size: 12px
- Font Weight: 600

Secondary Button:
- Height: 28px
- Padding: 6px 10px
- Border Radius: 6px
- Font Size: 11px
```

#### Column Container
```
Width: 1/3 of viewport on desktop
Min Height: 100vh
Border: 1px solid rgba(255, 255, 255, 0.06)
Border Radius: 8px
```

## Visual Regression Tolerance

Maximum acceptable pixel difference: **≤ 2px**

Areas to test:
- [ ] Card alignment (left/right/center)
- [ ] Text baseline alignment
- [ ] Icon sizing and positioning
- [ ] Spacing between elements
- [ ] Border and shadow consistency
- [ ] Color accuracy
- [ ] Hover state transitions

## Animation Timings

```css
/* Transition Speeds */
Fast: 150ms
Normal: 200ms
Slow: 300ms

/* Easing Functions */
Default: cubic-bezier(0.4, 0, 0.2, 1)
In: cubic-bezier(0.4, 0, 1, 1)
Out: cubic-bezier(0, 0, 0.2, 1)
InOut: cubic-bezier(0.4, 0, 0.2, 1)
```

## Price Update Flash Effects

```css
/* Green Flash (Price Up) */
Color: rgba(16, 185, 129, 0.3) to rgba(16, 185, 129, 0)
Duration: 500ms
Easing: ease-out

/* Red Flash (Price Down) */
Color: rgba(239, 68, 68, 0.3) to rgba(239, 68, 68, 0)
Duration: 500ms
Easing: ease-out
```

## Responsive Breakpoints & Pixel Alignment

### Mobile (320px - 425px)
```
- 1 Column Layout
- 16px padding on sides
- 8px card gap
- Touch target min 44px
- No hover effects
```

### Tablet (426px - 768px)
```
- 2 Column Layout
- 16px padding on sides
- 12px card gap
- Touch target min 44px
```

### Desktop (769px+)
```
- 3 Column Layout
- 24px padding on sides
- 16px card gap
- Hover effects enabled
```

## Testing Procedure

1. **Visual Comparison Tool**
   ```bash
   npm install --save-dev pixelmatch puppeteer
   ```

2. **Reference Images**
   - Screenshot axiom.trade/pulse at each breakpoint
   - Save to `tests/references/`

3. **Test Snapshots**
   - Run locally
   - Compare with references
   - Flag any >2px differences

4. **Documentation**
   - Update this file with any findings
   - Screenshot discrepancies for review
   - Note browser/OS-specific quirks

## Known Pixel-Perfect Details

### Skeleton Animation
- Shimmer wave duration: 2s
- Wave width: 400px
- Opacity: 0.2

### Popover Positioning
- Offset from trigger: 4px
- Animation duration: 150ms
- Backdrop blur: 8px

### Scroll Behavior
- Smooth scroll enabled
- Custom scrollbar width: 8px
- Scrollbar track opacity: 0.02

## Browser Compatibility

Tested and verified on:
- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Mobile Safari (iOS 14+)
- [ ] Chrome Mobile (Android 10+)

---

Last Updated: December 2024
