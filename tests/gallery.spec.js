const { test, expect } = require('@playwright/test');

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
  });

  async function openFirstItem(page) {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
  }

  test('should display gallery items', async ({ page }) => {
    const count = await page.locator('.gallery-item').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should open overlay on gallery item click', async ({ page }) => {
    await openFirstItem(page);
    await expect(page.locator('.gallery-overlay__title')).not.toBeEmpty();
  });

  test('should close overlay on ESC key', async ({ page }) => {
    await openFirstItem(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should close overlay on close button', async ({ page }) => {
    await openFirstItem(page);
    await page.locator('.gallery-overlay__close').click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should close overlay on outside click', async ({ page }) => {
    await openFirstItem(page);
    await page.locator('#gallery-overlay').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should show title and meta in overlay', async ({ page }) => {
    const firstItem = page.locator('.gallery-item').first();
    const title = await firstItem.getAttribute('data-title');
    await firstItem.click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
    await expect(page.locator('.gallery-overlay__title')).toHaveText(title);
  });

  test('should have 36 gallery items', async ({ page }) => {
    const count = await page.locator('.gallery-item').count();
    expect(count).toBe(36);
  });

  test('overlay image should have src set', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
    const src = await page.locator('.gallery-overlay__image').getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).not.toContain('data:image/gif');
  });
});
