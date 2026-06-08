const { test, expect } = require('@playwright/test');
const { loadRoom } = require('./helpers');

test.describe('Enquiries Room', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'enquiries');
  });

  test('should display the enquiries title', async ({ page }) => {
    await expect(page.locator('.enquiries__title')).toHaveText('Enquiries');
  });

  test('should display the enquiries description', async ({ page }) => {
    await expect(page.locator('.enquiries__desc').first()).toContainText('artwork, books, collaborations');
  });

  test('should have contact form', async ({ page }) => {
    await expect(page.locator('.enquiries__form')).toBeVisible();
  });

  test('form should have name input', async ({ page }) => {
    await expect(page.locator('#enquiry-name')).toBeVisible();
  });

  test('form should have email input', async ({ page }) => {
    await expect(page.locator('#enquiry-email')).toBeVisible();
  });

  test('form should have message textarea', async ({ page }) => {
    await expect(page.locator('#enquiry-message')).toBeVisible();
  });

  test('form should have submit button', async ({ page }) => {
    await expect(page.locator('.enquiries__form button[type="submit"]')).toBeVisible();
  });

  test('should have email link', async ({ page }) => {
    const link = page.locator('.enquiries__email-link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'mailto:hello@dayjah.co.uk');
    await expect(link).toContainText('hello@dayjah.co.uk');
  });
});

test.describe('Enquiries Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'enquiries');
  });

  test('should show error for empty name', async ({ page }) => {
    await page.locator('.enquiries__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.enquiries__form .form-status');
    await expect(status).toContainText('name');
  });

  test('should show error for empty email', async ({ page }) => {
    await page.locator('#enquiry-name').fill('Test User');
    await page.locator('.enquiries__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.enquiries__form .form-status');
    await expect(status).toContainText('email');
  });

  test('should submit with all fields filled', async ({ page }) => {
    await page.locator('#enquiry-name').fill('Test User');
    await page.locator('#enquiry-email').fill('test@example.com');
    await page.locator('#enquiry-message').fill('Hello, this is a test message.');
    await page.locator('.enquiries__form').evaluate(form => {
      form.noValidate = true;
      form.requestSubmit();
    });
    await page.waitForTimeout(5000);
    const status = page.locator('.enquiries__form .form-status');
    await expect(status).not.toBeEmpty();
  });
});
