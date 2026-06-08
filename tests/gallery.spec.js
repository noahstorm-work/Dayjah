const { test, expect } = require('@playwright/test');
const { loadRoom, openGalleryOverlay, closeGalleryOverlay } = require('./helpers');

test.describe('Gallery Room', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
  });

  test('should display gallery header', async ({ page }) => {
    await expect(page.locator('.gallery-header__title')).toHaveText('The Gallery');
  });

  test('should display gallery description', async ({ page }) => {
    await expect(page.locator('.gallery-header__desc')).toContainText('curated visual world');
  });

  test('should have 36 gallery items', async ({ page }) => {
    const count = await page.locator('.gallery-item').count();
    expect(count).toBe(36);
  });

  test('gallery items should have data-title attribute', async ({ page }) => {
    const title = await page.locator('.gallery-item').first().getAttribute('data-title');
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('gallery items should have role="listitem"', async ({ page }) => {
    const role = await page.locator('.gallery-item').first().getAttribute('role');
    expect(role).toBe('listitem');
  });

  test('gallery items should have tabindex="0"', async ({ page }) => {
    await expect(page.locator('.gallery-item').first()).toHaveAttribute('tabindex', '0');
  });

  test('gallery grid should have role="list"', async ({ page }) => {
    await expect(page.locator('.gallery-grid')).toHaveAttribute('role', 'list');
  });
});

test.describe('Gallery Overlay', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
  });

  test('should open overlay on item click', async ({ page }) => {
    await openGalleryOverlay(page);
    await expect(page.locator('.gallery-overlay__title')).not.toBeEmpty();
  });

  test('should show correct title in overlay', async ({ page }) => {
    const firstItem = page.locator('.gallery-item').first();
    const title = await firstItem.getAttribute('data-title');
    await firstItem.click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
    await expect(page.locator('.gallery-overlay__title')).toHaveText(title);
  });

  test('overlay image should have valid src', async ({ page }) => {
    await openGalleryOverlay(page);
    const src = await page.locator('.gallery-overlay__image').getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).not.toContain('data:image/gif');
  });

  test('overlay image should have alt text', async ({ page }) => {
    await openGalleryOverlay(page);
    const alt = await page.locator('.gallery-overlay__image').getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('should close overlay on ESC key', async ({ page }) => {
    await openGalleryOverlay(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should close overlay on close button', async ({ page }) => {
    await openGalleryOverlay(page);
    await page.locator('.gallery-overlay__close').click();
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('should close overlay on outside click', async ({ page }) => {
    await openGalleryOverlay(page);
    await page.locator('#gallery-overlay').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/);
  });

  test('overlay should have aria-modal="true"', async ({ page }) => {
    await expect(page.locator('#gallery-overlay')).toHaveAttribute('aria-modal', 'true');
  });

  test('overlay should have role="dialog"', async ({ page }) => {
    await expect(page.locator('#gallery-overlay')).toHaveAttribute('role', 'dialog');
  });
});

test.describe('Gallery Keyboard', () => {
  test('gallery items should be keyboard focusable', async ({ page }) => {
    await loadRoom(page, 'gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('.gallery-item').first().focus();
    await expect(page.locator('.gallery-item').first()).toBeFocused();
  });

  test('Enter key should open overlay', async ({ page }) => {
    await loadRoom(page, 'gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('.gallery-item').first().focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
  });

  test('Space key should open overlay', async ({ page }) => {
    await loadRoom(page, 'gallery');
    await page.locator('.gallery-item').first().waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('.gallery-item').first().focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(600);
    await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
  });
});
