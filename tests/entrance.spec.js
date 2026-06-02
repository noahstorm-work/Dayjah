const { test, expect } = require('@playwright/test');

test.describe('Entrance', () => {
  test('should display entrance with wordmark, tagline, and enter button', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const wordmark = page.locator('.entrance__wordmark');
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveText('Dayjah');

    await expect(page.locator('.entrance__line')).toContainText('Come in');
    await expect(page.locator('.entrance__tagline')).toContainText('Every day belongs to truth');

    const enterBtn = page.locator('.entrance__invitation');
    await expect(enterBtn).toBeVisible();
    await expect(enterBtn).toContainText('Enter');
  });

  test('should navigate to rooms hub on clicking Enter', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);

    await expect(page.locator('section[data-room="rooms"]')).toHaveClass(/active/);
    await expect(page.locator('.rooms-header__title')).toContainText('The Rooms');
  });

  test('should show compass navigation after entering', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });

    const compass = page.locator('.compass-nav');
    await expect(compass).toHaveCSS('opacity', '0');

    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);

    await expect(compass).toHaveCSS('opacity', '1');
  });
});
