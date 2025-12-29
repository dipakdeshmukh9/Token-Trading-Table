import { test, expect } from '@playwright/test';

test('pulse main page visual snapshot', async ({ page }) => {
  // Ensure consistent size
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  // Wait for main content to be visible
  await page.waitForSelector('header');
  await page.waitForLoadState('networkidle');

  const shot = await page.screenshot({ fullPage: true });
  // Compare with baseline - allow small pixel diff ratio (~0.3%) to cover up-to-2px diffs
  expect(shot).toMatchSnapshot('pulse-full.png', { maxDiffPixelRatio: 0.003 });
});
