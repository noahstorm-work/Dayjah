const { test, expect } = require('@playwright/test');

test.describe('Forms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.entrance__invitation').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('.entrance__invitation').click();
    await page.waitForTimeout(1000);
  });

  test('Objects form should validate empty email', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('email address');
      await dialog.accept();
    });
    await page.locator('[data-room="objects"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await page.locator('.objects__form .btn').click();
  });

  test('Objects form should validate email format', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('valid email');
      await dialog.accept();
    });
    await page.locator('[data-room="objects"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await page.locator('#objects-email').fill('not-an-email');
    await page.locator('.objects__form .btn').click();
  });

  test('Objects form should accept valid email', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Thank you');
      await dialog.accept();
    });
    await page.locator('[data-room="objects"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await page.locator('#objects-email').fill('test@example.com');
    await page.locator('.objects__form .btn').click();
  });

  test('Contact form should validate empty name', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('name');
      await dialog.accept();
    });
    await page.locator('[data-room="contact"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await page.locator('.contact__form .btn').click();
  });

  test('Contact form should validate empty email', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('email');
      await dialog.accept();
    });
    await page.locator('[data-room="contact"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await page.locator('#contact-name').fill('Test User');
    await page.locator('.contact__form .btn').click();
  });

  test('Contact form should accept valid submission', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Thank you');
      await dialog.accept();
    });
    await page.locator('[data-room="contact"].compass-nav__btn').click();
    await page.waitForTimeout(800);
    await page.locator('#contact-name').fill('Test User');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-message').fill('Hello, this is a test message.');
    await page.locator('.contact__form .btn').click();
  });
});
