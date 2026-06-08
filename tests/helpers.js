const { expect } = require('@playwright/test');

const ALL_ROOMS = ['home', 'diary', 'gallery', 'reading-room', 'sanctuary', 'editions', 'enquiries'];

async function loadRoom(page, room) {
  const hash = room === 'home' ? '' : room;
  await page.goto(`/#${hash}`);
  await page.locator(`section[data-room="${room}"]`).waitFor({ state: 'visible', timeout: 15000 });
}

async function waitForReveal(page) {
  await page.waitForTimeout(3000);
}

async function openGalleryOverlay(page, index = 0) {
  const item = page.locator('.gallery-item').nth(index);
  await item.click();
  await page.waitForTimeout(600);
  await expect(page.locator('#gallery-overlay')).toHaveClass(/open/, { timeout: 10000 });
}

async function closeGalleryOverlay(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await expect(page.locator('#gallery-overlay')).not.toHaveClass(/open/, { timeout: 10000 });
}

module.exports = { ALL_ROOMS, loadRoom, waitForReveal, openGalleryOverlay, closeGalleryOverlay };
