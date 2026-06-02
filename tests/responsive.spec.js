const { test, expect } = require('@playwright/test');

test.describe('Responsive', () => {
  test('should layout correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#rooms');
    await page.waitForTimeout(700);
    await expect(page.locator('section[data-room="rooms"]')).toHaveClass(/active/);
    await expect(page.locator('.room-card').first()).toBeVisible();
    await expect(page.locator('.compass-nav')).toBeVisible();
  });

  test('should layout correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/#gallery');
    await page.waitForTimeout(700);
    await expect(page.locator('.gallery-item').first()).toBeVisible();
  });
});
