const { test, expect } = require('@playwright/test');

test.describe('Accessibility', () => {
  test('skip link should be visible on focus', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
  });

  test('should have proper aria labels on navigation', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await expect(page.locator('.compass-nav')).toHaveAttribute('aria-label', 'Room navigation');
  });

  test('navigation buttons should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await page.locator('.compass-nav__btn').first().focus();
    await expect(page.locator('.compass-nav__btn').first()).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('h1')).toHaveText('Dayjah');
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(700);
    await expect(page.locator('section[data-room="gallery"] h2')).toContainText('Gallery');
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(1000);
    const images = page.locator('.gallery-item__image');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      expect(await images.nth(i).getAttribute('alt')).toBeTruthy();
    }
  });

  test('gallery items should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(700);
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(1000);
    await page.locator('.gallery-item').first().focus();
    await expect(page.locator('.gallery-item').first()).toBeFocused();
  });
});

test.describe('Reduced Motion', () => {
  test('should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(500);
    await expect(page.locator('section[data-room="rooms"]')).toHaveClass(/active/);
  });
});
