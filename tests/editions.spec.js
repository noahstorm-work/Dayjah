const { test, expect } = require('@playwright/test');
const { loadRoom } = require('./helpers');

test.describe('Editions Room', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'editions');
  });

  test('should display the editions title', async ({ page }) => {
    await expect(page.locator('.editions__title')).toHaveText('Editions');
  });

  test('should display the editions note', async ({ page }) => {
    await expect(page.locator('.editions__note')).toContainText('Give beauty first');
  });

  test('should display editions descriptions', async ({ page }) => {
    const descs = page.locator('.editions__desc');
    const count = await descs.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('descriptions should mention shop and world', async ({ page }) => {
    await expect(page.locator('.editions__desc').first()).toContainText('Editions will open slowly');
  });

  test('should have email signup form', async ({ page }) => {
    await expect(page.locator('.editions__form')).toBeVisible();
  });

  test('form should have email input', async ({ page }) => {
    await expect(page.locator('#editions-email')).toBeVisible();
  });

  test('form should have submit button', async ({ page }) => {
    await expect(page.locator('.editions__form button[type="submit"]')).toBeVisible();
  });
});

test.describe('Editions Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'editions');
  });

  test('should show error for empty email', async ({ page }) => {
    await page.locator('.editions__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.editions__form .form-status');
    await expect(status).toContainText('email');
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.locator('#editions-email').fill('a@b');
    await page.locator('.editions__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.editions__form .form-status');
    await expect(status).toContainText('valid email');
  });

  test('should submit with valid email', async ({ page }) => {
    await page.locator('#editions-email').fill('test@example.com');
    await page.locator('.editions__form').evaluate(form => {
      form.noValidate = true;
      form.requestSubmit();
    });
    await page.waitForTimeout(3000);
    const status = page.locator('.editions__form .form-status');
    await expect(status).not.toBeEmpty();
  });
});
