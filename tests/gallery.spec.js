const { test, expect } = require('@playwright/test');

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#gallery');
    await page.waitForTimeout(700);
  });

  test('should display gallery items', async ({ page }) => {
    await expect(page.locator('.gallery-item').first()).toBeVisible();
    const count = await page.locator('.gallery-item').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should open overlay on gallery item click', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/);
    await expect(page.locator('.gallery-overlay__title')).not.toBeEmpty();
  });

  test('should close overlay on ESC key', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should close overlay on close button', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await page.locator('.gallery-overlay__close').click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should close overlay on outside click', async ({ page }) => {
    await page.locator('.gallery-item').first().click();
    await page.waitForTimeout(600);
    await page.locator('#gallery-overlay').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });
});
