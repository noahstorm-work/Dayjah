const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  async function goTo(page, hash) {
    await page.goto(`/#${hash}`);
    await page.waitForTimeout(700);
    await page.locator('.compass-nav').waitFor({ state: 'visible', timeout: 5000 });
  }

  const rooms = ['gallery', 'garden', 'objects', 'about', 'contact'];

  for (const room of rooms) {
    test(`should navigate to ${room} via compass nav`, async ({ page }) => {
      await goTo(page, 'rooms');
      await page.locator(`[data-room="${room}"].compass-nav__btn`).click();
      await page.waitForTimeout(700);
      await expect(page.locator(`section[data-room="${room}"]`)).toHaveClass(/active/);
    });
  }

  test('should highlight active room in compass nav', async ({ page }) => {
    await goTo(page, 'rooms');
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(700);
    await expect(page.locator('.compass-nav__btn.active')).toHaveAttribute('data-room', 'gallery');
  });

  test('should navigate via room cards', async ({ page }) => {
    await goTo(page, 'rooms');
    await page.locator('.room-card').first().click();
    await page.waitForTimeout(700);
    await expect(page.locator('section[data-room="gallery"]')).toHaveClass(/active/);
  });
});
