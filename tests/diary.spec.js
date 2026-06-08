const { test, expect } = require('@playwright/test');
const { loadRoom } = require('./helpers');

test.describe('Diary Room', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'diary');
  });

  test('should display the diary header title', async ({ page }) => {
    await expect(page.locator('.diary-header__title')).toHaveText('The Diary of AI');
  });

  test('should display the diary subtitle', async ({ page }) => {
    await page.locator('.diary-header__subtitle').waitFor({ state: 'visible', timeout: 15000 });
    await expect(page.locator('.diary-header__subtitle')).toContainText('Text leads. Art answers.');
  });

  test('should display the diary intro', async ({ page }) => {
    await expect(page.locator('.diary-header__intro')).toContainText('first book-room of DAYJAH');
  });

  test('should display the diary note', async ({ page }) => {
    await expect(page.locator('.diary-header__note')).toContainText('not a blog');
  });

  test('should have diary entries container', async ({ page }) => {
    await expect(page.locator('#diary-entries')).toBeVisible();
  });

  test('should render diary entries', async ({ page }) => {
    await page.waitForTimeout(1000);
    const entries = page.locator('#diary-entries > *');
    const count = await entries.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have prev/next navigation buttons', async ({ page }) => {
    await expect(page.locator('.diary-nav__prev')).toBeVisible();
    await expect(page.locator('.diary-nav__next')).toBeVisible();
  });

  test('should have navigation dots', async ({ page }) => {
    await expect(page.locator('.diary-nav__dots')).toBeVisible();
  });

  test('should display entry counter', async ({ page }) => {
    const counter = page.locator('.diary-nav__counter');
    await expect(counter).toBeVisible();
    await expect(counter).toContainText('/');
  });

  test('next button should advance entry', async ({ page }) => {
    const counter = page.locator('.diary-nav__counter');
    await counter.waitFor({ state: 'visible', timeout: 15000 });
    const initial = await counter.textContent();
    await page.locator('.diary-nav__next').scrollIntoViewIfNeeded();
    await page.locator('.diary-nav__next').click({ force: true });
    await page.waitForTimeout(1000);
    await counter.waitFor({ state: 'visible', timeout: 15000 });
    const next = await counter.textContent();
    expect(next).not.toBe(initial);
  });
});
