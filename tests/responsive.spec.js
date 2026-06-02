const { test, expect } = require('@playwright/test');

test.describe('Responsive', () => {
  test('should layout correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);

    const rooms = page.locator('section[data-room="rooms"]');
    await expect(rooms).toHaveClass(/active/);

    const card = page.locator('.room-card').first();
    await expect(card).toBeVisible();

    const compass = page.locator('.compass-nav');
    await expect(compass).toBeVisible();
  });

  test('should layout correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);

    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(1000);

    const items = page.locator('.gallery-item');
    await expect(items.first()).toBeVisible();
  });
});
