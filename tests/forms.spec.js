const { test, expect } = require('@playwright/test');

test.describe('Forms', () => {
  test('Editions form should validate empty email', async ({ page }) => {
    await page.goto('/#editions');
    await page.waitForTimeout(1000);
    // Dispatch submit event directly (bypasses HTML5 validation)
    await page.locator('.editions__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.editions__form .form-status');
    await expect(status).toContainText('email');
  });

  test('Editions form should validate email format', async ({ page }) => {
    await page.goto('/#editions');
    await page.waitForTimeout(1000);
    await page.locator('#editions-email').fill('a@b');
    await page.locator('.editions__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.editions__form .form-status');
    await expect(status).toContainText('valid email');
  });

  test('Editions form submits via button', async ({ page }) => {
    await page.goto('/#editions');
    await page.waitForTimeout(1000);
    await page.locator('#editions-email').fill('test@example.com');
    // Use evaluate to safely submit (bypasses HTML5 validation)
    await page.locator('.editions__form').evaluate(form => {
      form.noValidate = true;
      form.requestSubmit();
    });
    await page.waitForTimeout(3000);
    const status = page.locator('.editions__form .form-status');
    await expect(status).not.toBeEmpty();
  });

  test('Enquiries form should validate empty name', async ({ page }) => {
    await page.goto('/#enquiries');
    await page.waitForTimeout(1000);
    await page.locator('.enquiries__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.enquiries__form .form-status');
    await expect(status).toContainText('name');
  });

  test('Enquiries form should validate empty email', async ({ page }) => {
    await page.goto('/#enquiries');
    await page.waitForTimeout(1000);
    await page.locator('#enquiry-name').fill('Test User');
    await page.locator('.enquiries__form').evaluate(form => {
      form.noValidate = true;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForTimeout(500);
    const status = page.locator('.enquiries__form .form-status');
    await expect(status).toContainText('email');
  });

  test('Enquiries form validates all fields', async ({ page }) => {
    await page.goto('/#enquiries');
    await page.waitForTimeout(1000);
    await page.locator('#enquiry-name').fill('Test User');
    await page.locator('#enquiry-email').fill('test@example.com');
    await page.locator('#enquiry-message').fill('Hello, this is a test message.');
    await page.locator('.enquiries__form').evaluate(form => {
      form.noValidate = true;
      form.requestSubmit();
    });
    await page.waitForTimeout(3000);
    const status = page.locator('.enquiries__form .form-status');
    await expect(status).not.toBeEmpty();
  });
});
