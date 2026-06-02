const { test, expect } = require('@playwright/test');

test.describe('Entrance', () => {
  test('should display entrance with wordmark, tagline, and enter button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.entrance__wordmark')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.entrance__wordmark')).toHaveText('Dayjah');
    await expect(page.locator('.entrance__line')).toContainText('Come in');
    await expect(page.locator('.entrance__tagline')).toContainText('Every day belongs to truth');
    await expect(page.locator('.entrance__invitation')).toContainText('Enter');
  });

  test('should navigate to rooms hub on clicking Enter', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await expect(page.locator('section[data-room="rooms"]')).toHaveClass(/active/);
  });

  test('should show compass navigation after entering', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('.compass-nav')).toHaveCSS('opacity', '0');
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await expect(page.locator('.compass-nav')).toHaveCSS('opacity', '1');
  });
});
