const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);
  });

  test('should navigate to Gallery via compass nav', async ({ page }) => {
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await expect(page.locator('section[data-room="gallery"]')).toHaveClass(/active/);
    await expect(page.locator('.gallery-header__title')).toContainText('The Gallery');
  });

  test('should navigate to Garden via compass nav', async ({ page }) => {
    await page.locator('[data-room="garden"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await expect(page.locator('section[data-room="garden"]')).toHaveClass(/active/);
    await expect(page.locator('.garden__text-title')).toContainText('garden');
  });

  test('should navigate to Objects via compass nav', async ({ page }) => {
    await page.locator('[data-room="objects"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await expect(page.locator('section[data-room="objects"]')).toHaveClass(/active/);
    await expect(page.locator('.objects__title')).toContainText('Objects');
  });

  test('should navigate to About via compass nav', async ({ page }) => {
    await page.locator('[data-room="about"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await expect(page.locator('section[data-room="about"]')).toHaveClass(/active/);
    await expect(page.locator('.about__title')).toContainText('About');
  });

  test('should navigate to Contact via compass nav', async ({ page }) => {
    await page.locator('[data-room="contact"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await expect(page.locator('section[data-room="contact"]')).toHaveClass(/active/);
    await expect(page.locator('.contact__title')).toContainText('Contact');
  });

  test('should highlight active room in compass nav', async ({ page }) => {
    await page.locator('[data-room="gallery"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    const activeBtn = page.locator('.compass-nav__btn.active');
    await expect(activeBtn).toHaveAttribute('data-room', 'gallery');
  });

  test('should navigate to rooms via room cards', async ({ page }) => {
    const cards = page.locator('.room-card');
    const count = await cards.count();
    expect(count).toBe(4);
    await cards.first().click();
    await page.waitForTimeout(800);
    await expect(page.locator('section[data-room="gallery"]')).toHaveClass(/active/);
  });
});
