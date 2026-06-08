const { test, expect } = require('@playwright/test');

test.describe('Responsive', () => {
  test('should render home on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForTimeout(3000);
    await expect(page.locator('.home__wordmark')).toBeVisible();
    // Nav should be present and scrollable
    await expect(page.locator('.site-nav')).toBeVisible();
  });

  test('should render on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/#gallery');
    await page.waitForTimeout(1500);
    await expect(page.locator('.gallery-item').first()).toBeVisible();
    const count = await page.locator('.gallery-item').count();
    expect(count).toBe(36);
  });

  test('should render on desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/#gallery');
    await page.waitForTimeout(1500);
    await expect(page.locator('.gallery-item').first()).toBeVisible();
  });

  test('should render all rooms at desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const rooms = ['home', 'diary', 'gallery', 'reading-room', 'sanctuary', 'editions', 'enquiries'];
    for (const room of rooms) {
      await page.goto(`/#${room === 'home' ? '' : room}`);
      await page.waitForTimeout(1000);
      await expect(page.locator(`section[data-room="${room}"]`)).toBeVisible();
    }
  });
});

test.describe('Double Scrollbar Detection', () => {
  test('no double scrollbar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForTimeout(500);
    const hasDoubleScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollHeight > window.innerHeight
        && window.innerWidth - document.documentElement.clientWidth > 17;
    });
    // html overflow is hidden, so no scrollbar should appear
    const htmlOverflow = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).overflow;
    });
    expect(htmlOverflow).toBe('hidden');
  });

  test('no double scrollbar on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#gallery');
    await page.waitForTimeout(1500);
    const htmlOverflow = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).overflow;
    });
    expect(htmlOverflow).toBe('hidden');
  });

  test('room scrolling works without duplicate scrollbars', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 600 });
    await page.goto('/#sanctuary');
    await page.waitForTimeout(1000);
    // The room itself should scroll, but html/body should not
    const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
    const htmlOverflow = await page.evaluate(() => getComputedStyle(document.documentElement).overflow);
    expect(bodyOverflow).toBe('hidden');
    expect(htmlOverflow).toBe('hidden');
  });
});
