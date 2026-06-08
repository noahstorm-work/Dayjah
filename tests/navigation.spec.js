const { test, expect } = require('@playwright/test');

const ROOMS = ['home', 'diary', 'gallery', 'reading-room', 'sanctuary', 'editions', 'enquiries'];

test.describe('Navigation', () => {
  ROOMS.forEach(room => {
    test(`nav button for ${room} should switch to that room`, async ({ page }) => {
      await page.goto('/');
      await page.locator(`.site-nav__btn[data-room="${room}"]`).waitFor({ state: 'visible', timeout: 15000 });
      await page.locator(`.site-nav__btn[data-room="${room}"]`).click();
      await page.waitForTimeout(300);
      await expect(page.locator(`section[data-room="${room}"]`)).toBeVisible();
    });
  });

  test('active nav button matches current room', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.locator('.site-nav__btn[data-room="gallery"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('.site-nav__btn.active')).toHaveAttribute('data-room', 'gallery');
  });

  test('URL hash updates on room switch', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.locator('.site-nav__btn[data-room="sanctuary"]').click();
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/#sanctuary/);
  });

  test('home room has no hash', async ({ page }) => {
    await page.goto('/#gallery');
    await page.waitForTimeout(500);
    await page.locator('.site-nav__btn[data-room="home"]').click();
    await page.waitForTimeout(300);
    await expect(page).not.toHaveURL(/#/);
  });

  test('all nav buttons are visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const buttons = page.locator('.site-nav__btn');
    const count = await buttons.count();
    expect(count).toBe(ROOMS.length);
  });

  test('direct hash loads correct room', async ({ page }) => {
    await page.goto('/#gallery');
    await page.waitForTimeout(500);
    const gallery = page.locator('section[data-room="gallery"]');
    await expect(gallery).toBeVisible();
    await expect(gallery).toHaveClass(/active/);
  });
});
