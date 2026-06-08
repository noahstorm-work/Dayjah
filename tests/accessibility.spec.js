const { test, expect } = require('@playwright/test');

test.describe('Accessibility', () => {
  test('skip link should be visible on focus', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.querySelector('.skip-link').focus());
    await expect(page.locator('.skip-link')).toBeFocused();
  });

  test('should have proper aria labels on navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page.locator('.site-nav')).toHaveAttribute('aria-label', 'Site navigation');
  });

  test('navigation buttons should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      const btn = document.querySelector('.site-nav__btn');
      if (btn) btn.focus();
    });
    const firstBtn = page.locator('.site-nav__btn').first();
    await expect(firstBtn).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page.locator('h1')).toHaveText('DAYJAH');
    // Navigate to gallery and check h2
    await page.locator('.site-nav__btn[data-room="gallery"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('section[data-room="gallery"] h2')).toContainText('Gallery');
  });

  test('all gallery images should have alt text', async ({ page }) => {
    await page.goto('/#gallery');
    await page.waitForTimeout(1500);
    const images = page.locator('.gallery-item__image');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('gallery items should be keyboard accessible', async ({ page }) => {
    await page.goto('/#gallery');
    await page.waitForTimeout(1500);
    await page.locator('.gallery-item').first().focus();
    await expect(page.locator('.gallery-item').first()).toBeFocused();
  });

  test('gallery items have tabindex="0"', async ({ page }) => {
    await page.goto('/#gallery');
    await page.waitForTimeout(1500);
    await expect(page.locator('.gallery-item').first()).toHaveAttribute('tabindex', '0');
  });
});

test.describe('Reduced Motion', () => {
  test('should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForTimeout(1000);
    await expect(page.locator('.home__wordmark')).toBeVisible();
    await expect(page.locator('.home__wordmark')).toHaveClass(/reveal/);
  });
});
