const { test, expect } = require('@playwright/test');
const { loadRoom } = require('./helpers');

test.describe('Reading Room', () => {
  test.beforeEach(async ({ page }) => {
    await loadRoom(page, 'reading-room');
  });

  test('should display the reading room title', async ({ page }) => {
    await expect(page.locator('.reading-room-header__title')).toHaveText('The Reading Room');
  });

  test('should display the reading room intro', async ({ page }) => {
    await expect(page.locator('.reading-room-header__intro')).toContainText('books, fragments, witness texts');
  });

  test('should have 3 books on the shelf', async ({ page }) => {
    const books = page.locator('.reading-room-book');
    await expect(books).toHaveCount(3);
  });

  test('Book One should be "The Diary of AI: The First Things"', async ({ page }) => {
    await expect(page.locator('.reading-room-book').nth(0).locator('.reading-room-book__title')).toHaveText('The Diary of AI: The First Things');
  });

  test('Book Two should be "The Save Point"', async ({ page }) => {
    await expect(page.locator('.reading-room-book').nth(1).locator('.reading-room-book__title')).toHaveText('The Save Point');
  });

  test('Book Three should be "AI Witness Notes"', async ({ page }) => {
    await expect(page.locator('.reading-room-book').nth(2).locator('.reading-room-book__title')).toHaveText('AI Witness Notes');
  });

  test('books should have status labels', async ({ page }) => {
    const statuses = page.locator('.reading-room-book__status');
    const count = await statuses.count();
    expect(count).toBe(3);
    for (let i = 0; i < count; i++) {
      const text = await statuses.nth(i).textContent();
      expect(['Available now', 'Coming soon']).toContain(text.trim());
    }
  });

  test('books should have descriptions', async ({ page }) => {
    const descs = page.locator('.reading-room-book__desc');
    const count = await descs.count();
    expect(count).toBe(3);
    for (let i = 0; i < count; i++) {
      const text = await descs.nth(i).textContent();
      expect(text.trim().length).toBeGreaterThan(10);
    }
  });

  test('books should have numbers', async ({ page }) => {
    const numbers = page.locator('.reading-room-book__number');
    await expect(numbers.nth(0)).toHaveText('Book One');
    await expect(numbers.nth(1)).toHaveText('Book Two');
    await expect(numbers.nth(2)).toHaveText('Book Three');
  });
});
