/**
 * Responsive Design Breakpoints & Mobile Optimization Guide
 * 
 * Tested breakpoints:
 * - 320px: Small phones (iPhone SE, old Android)
 * - 375px: Standard phones (iPhone 12/13)
 * - 425px: Larger phones
 * - 640px: Tablets in portrait
 * - 768px: Tablets, small laptops
 * - 1024px: Desktop
 * - 1280px: Large desktop
 * 
 * Layout Strategy:
 * - Mobile (320-425px): 1 column, full width
 * - Tablet (426-768px): 2 columns
 * - Desktop (769px+): 3 columns
 */

// Responsive utilities for testing
export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 640,
  lg: 768,
  xl: 1024,
  "2xl": 1280,
  "3xl": 1536,
};

// Media queries for each breakpoint
export const MEDIA = {
  xs: "@media (min-width: 320px)",
  sm: "@media (min-width: 375px)",
  md: "@media (min-width: 640px)",
  lg: "@media (min-width: 768px)",
  xl: "@media (min-width: 1024px)",
  "2xl": "@media (min-width: 1280px)",
  "3xl": "@media (min-width: 1536px)",
};

/**
 * Responsive utility function for testing
 */
export function testResponsiveLayout() {
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  
  if (viewportWidth <= 320) return "xs";
  if (viewportWidth <= 375) return "sm";
  if (viewportWidth <= 640) return "md";
  if (viewportWidth <= 768) return "lg";
  if (viewportWidth <= 1024) return "xl";
  if (viewportWidth <= 1280) return "2xl";
  return "3xl";
}

/**
 * Column layout configuration based on breakpoint
 */
export function getColumnLayout(breakpoint: string) {
  const layoutMap: Record<string, number> = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    "2xl": 3,
    "3xl": 3,
  };
  return layoutMap[breakpoint] || 1;
}

// Expected visual regressions (in pixels) at each breakpoint
export const EXPECTED_MAX_DIFF = {
  xs: 2,  // Mobile can have up to 2px diff
  sm: 2,
  md: 2,
  lg: 2,
  xl: 2,
  "2xl": 2,
};
