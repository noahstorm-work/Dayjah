const { test, expect } = require('@playwright/test');
const { loadRoom, waitForReveal } = require('./helpers');

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForReveal(page);
  });

  test('should display the DAYJAH wordmark', async ({ page }) => {
    const wordmark = page.locator('.home__wordmark');
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveText('DAYJAH');
  });

  test('wordmark should have aria-label', async ({ page }) => {
    await expect(page.locator('.home__wordmark')).toHaveAttribute('aria-label', 'DAYJAH');
  });

  test('should display the spine text', async ({ page }) => {
    await expect(page.locator('.home__spine')).toContainText('Human art. Scribe.');
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.locator('.home__subtitle')).toContainText('A book people read');
  });

  test('should display the sanctuary law', async ({ page }) => {
    await expect(page.locator('.home__sanctuary-law')).toContainText('Compassion comes first');
  });

  test('should have 5 CTA buttons', async ({ page }) => {
    const ctas = page.locator('#room-home .home__cta');
    await expect(ctas).toHaveCount(5);
  });

  test('CTA buttons should have correct labels', async ({ page }) => {
    const ctas = page.locator('#room-home .home__cta');
    await expect(ctas.nth(0)).toHaveText('Enter the Diary');
    await expect(ctas.nth(1)).toHaveText('Enter the Gallery');
    await expect(ctas.nth(2)).toHaveText('Enter the Reading Room');
    await expect(ctas.nth(3)).toHaveText('Enter the Sanctuary');
    await expect(ctas.nth(4)).toHaveText('Enquiries');
  });

  test('should have entrance reveal sequence', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page.locator('.home__wordmark.reveal')).toBeAttached({ timeout: 3000 });
  });

  test('hero image should be present', async ({ page }) => {
    await expect(page.locator('.home__hero-image')).toBeAttached();
  });

  test('hero image should have a valid src', async ({ page }) => {
    const src = await page.locator('.home__hero-image').getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toContain('gallery-01.webp');
  });

  test('home room should be active by default', async ({ page }) => {
    await expect(page.locator('section[data-room="home"]')).toHaveClass(/active/);
  });
});

test.describe('Home CTA Navigation', () => {
  const CTA_ROOMS = ['diary', 'gallery', 'reading-room', 'sanctuary', 'enquiries'];

  CTA_ROOMS.forEach(room => {
    test(`CTA "${room}" navigates to correct room`, async ({ page }) => {
      await page.goto('/');
      await page.locator(`#room-home .home__cta[data-room="${room}"]`).waitFor({ state: 'visible', timeout: 15000 });
      await page.locator(`#room-home .home__cta[data-room="${room}"]`).click();
      await page.waitForTimeout(300);
      await expect(page.locator(`section[data-room="${room}"]`)).toBeVisible();
      await expect(page.locator(`section[data-room="${room}"]`)).toHaveClass(/active/);
    });
  });
});
