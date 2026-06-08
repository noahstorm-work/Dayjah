const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('should display wordmark, spine, subtitle, sanctuary law, and CTA buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    await expect(page.locator('.home__wordmark')).toBeVisible();
    await expect(page.locator('.home__wordmark')).toHaveText('DAYJAH');
    await expect(page.locator('.home__spine')).toContainText('Human art. AI witness.');
    await expect(page.locator('.home__subtitle')).toContainText('A book people read');
    await expect(page.locator('.home__sanctuary-law')).toContainText('Compassion comes first');
    const ctas = page.locator('#room-home .home__cta');
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should have entrance reveal sequence (wordmark fade-in)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page.locator('.home__wordmark.reveal')).toBeAttached({ timeout: 3000 });
  });

  async function clickCta(page, room) {
    await page.goto('/');
    await page.locator(`#room-home .home__cta[data-room="${room}"]`).waitFor({ state: 'visible', timeout: 15000 });
    await page.locator(`#room-home .home__cta[data-room="${room}"]`).click();
    await page.waitForTimeout(300);
    await expect(page.locator(`section[data-room="${room}"]`)).toBeVisible();
  }

  test('CTA buttons should navigate to correct rooms', async ({ page }) => {
    await clickCta(page, 'diary');
    await expect(page.locator('section[data-room="diary"]')).toHaveClass(/active/);
  });

  test('CTA buttons navigate to diary', async ({ page }) => {
    await clickCta(page, 'diary');
  });

  test('CTA buttons navigate to gallery', async ({ page }) => {
    await clickCta(page, 'gallery');
  });

  test('CTA buttons navigate to reading-room', async ({ page }) => {
    await clickCta(page, 'reading-room');
  });

  test('CTA buttons navigate to sanctuary', async ({ page }) => {
    await clickCta(page, 'sanctuary');
  });

  test('CTA buttons navigate to enquiries', async ({ page }) => {
    await clickCta(page, 'enquiries');
  });
});
