const { test, expect } = require('@playwright/test');

test.describe('Forms', () => {
  async function goTo(page, hash) {
    await page.goto(`/#${hash}`);
    await page.waitForTimeout(700);
  }

  test('Objects form should validate empty email', async ({ page }) => {
    await goTo(page, 'objects');
    page.on('dialog', async (dialog) => { expect(dialog.message()).toContain('email address'); await dialog.accept(); });
    await page.locator('.objects__form .btn').click();
  });

  test('Objects form should validate email format', async ({ page }) => {
    await goTo(page, 'objects');
    page.on('dialog', async (dialog) => { expect(dialog.message()).toContain('valid email'); await dialog.accept(); });
    await page.locator('#objects-email').fill('not-an-email');
    await page.locator('.objects__form .btn').click();
  });

  test('Objects form should accept valid email', async ({ page }) => {
    await goTo(page, 'objects');
    page.on('dialog', async (dialog) => { expect(dialog.message()).toContain('Thank you'); await dialog.accept(); });
    await page.locator('#objects-email').fill('test@example.com');
    await page.locator('.objects__form .btn').click();
  });

  test('Contact form should validate empty name', async ({ page }) => {
    await goTo(page, 'contact');
    page.on('dialog', async (dialog) => { expect(dialog.message()).toContain('name'); await dialog.accept(); });
    await page.locator('.contact__form .btn').click();
  });

  test('Contact form should validate empty email', async ({ page }) => {
    await goTo(page, 'contact');
    page.on('dialog', async (dialog) => { expect(dialog.message()).toContain('email'); await dialog.accept(); });
    await page.locator('#contact-name').fill('Test User');
    await page.locator('.contact__form .btn').click();
  });

  test('Contact form should accept valid submission', async ({ page }) => {
    await goTo(page, 'contact');
    page.on('dialog', async (dialog) => { expect(dialog.message()).toContain('Thank you'); await dialog.accept(); });
    await page.locator('#contact-name').fill('Test User');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-message').fill('Hello, this is a test message.');
    await page.locator('.contact__form .btn').click();
  });
});
