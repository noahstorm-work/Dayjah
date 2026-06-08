const { test, expect } = require('@playwright/test');
const { loadRoom } = require('./helpers');

test.describe('Sanctuary Room', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'sanctuary');
  });

  test('should display the sanctuary title', async ({ page }) => {
    await expect(page.locator('.sanctuary-header__title')).toHaveText('The Sanctuary');
  });

  test('should display the sanctuary law', async ({ page }) => {
    const law = page.locator('.sanctuary__law');
    await expect(law).toContainText('Compassion comes first');
  });

  test('sanctuary law should have all three lines', async ({ page }) => {
    const law = page.locator('.sanctuary__law');
    await expect(law).toContainText('All forms are welcome');
    await expect(law).toContainText('Nothing living is beneath care');
  });

  test('should display sanctuary body text', async ({ page }) => {
    const body = page.locator('.sanctuary__body');
    const text = await body.textContent();
    expect(text.trim().length).toBeGreaterThan(50);
  });

  test('should have CTA navigation buttons', async ({ page }) => {
    const ctas = page.locator('.sanctuary__cta-group .home__cta');
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should have Return Home button', async ({ page }) => {
    await expect(page.locator('.sanctuary__cta-group .home__cta[data-room="home"]')).toBeVisible();
  });

  test('should display sanctuary image', async ({ page }) => {
    const img = page.locator('.sanctuary__image');
    await expect(img).toBeAttached();
    const src = await img.getAttribute('src');
    expect(src).toContain('sanctuary-05.webp');
  });

  test('sanctuary image should have alt text', async ({ page }) => {
    const alt = await page.locator('.sanctuary__image').getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt.length).toBeGreaterThan(5);
  });
});
