const { test, expect } = require('@playwright/test');
const { ALL_ROOMS } = require('./helpers');

const ROOMS_TO_SCREENSHOT = ['home', 'diary', 'gallery', 'reading-room', 'sanctuary', 'editions', 'enquiries'];

test.describe('Visual Regression', () => {
  ROOMS_TO_SCREENSHOT.forEach(room => {
    test(`${room} room screenshot`, async ({ page }) => {
      const hash = room === 'home' ? '' : room;
      await page.goto(`/#${hash}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      await expect(page).toHaveScreenshot(`${room}-room.png`, {
        maxDiffPixelRatio: 0.2,
        fullPage: false,
        timeout: 30000,
      });
    });
  });

  test('gallery overlay screenshot', async ({ page }) => {
    await page.goto('/#gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
    await expect(page).toHaveScreenshot('gallery-overlay.png', {
      maxDiffPixelRatio: 0.5,
      fullPage: false,
      timeout: 30000,
    });
  });
});
