const { test, expect } = require('@playwright/test');

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(1000);
  });

  test('should display gallery items', async ({ page }) => {
    const items = page.locator('.gallery-item');
    await expect(items.first()).toBeVisible();
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should open overlay on gallery item click', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);

    const overlay = page.locator('#gallery-overlay');
    await expect(overlay).toHaveClass(/open/);
    const title = page.locator('.gallery-overlay__title');
    await expect(title).not.toBeEmpty();
  });

  test('should close overlay on ESC key', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);

    const overlay = page.locator('#gallery-overlay');
    await expect(overlay).not.toHaveClass(/open/);
  });

  test('should close overlay on close button click', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);

    await page.locator('.gallery-overlay__close').click();
    await page.waitForTimeout(600);

    const overlay = page.locator('#gallery-overlay');
    await expect(overlay).not.toHaveClass(/open/);
  });

  test('should close overlay on outside click', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);

    await page.locator('#gallery-overlay').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(600);

    const overlay = page.locator('#gallery-overlay');
    await expect(overlay).not.toHaveClass(/open/);
  });
});
