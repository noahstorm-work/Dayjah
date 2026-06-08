const { test, expect } = require('@playwright/test');
const { ALL_ROOMS } = require('./helpers');

test.describe('Brand Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
  });

  test('nav and headings should not contain "Storm" branding', async ({ page }) => {
    const navText = await page.locator('.site-nav').textContent();
    expect(navText.toLowerCase()).not.toContain('storm');
    const h1 = await page.locator('h1').textContent();
    expect(h1.toLowerCase()).not.toContain('storm');
    const h2s = page.locator('h2');
    const count = await h2s.count();
    for (let i = 0; i < count; i++) {
      const text = await h2s.nth(i).textContent();
      expect(text.toLowerCase()).not.toContain('storm');
    }
  });

  test('CTA buttons should not contain "Storm" branding', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).textContent();
      expect(text.toLowerCase()).not.toContain('storm');
    }
  });

  test('meta tags should not contain "Storm"', async ({ page }) => {
    const title = await page.title();
    expect(title.toLowerCase()).not.toContain('storm');
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc.toLowerCase()).not.toContain('storm');
  });

  test('nav and headings should not contain "purple"', async ({ page }) => {
    const navText = await page.locator('.site-nav').textContent();
    expect(navText.toLowerCase()).not.toContain('purple');
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();
    for (let i = 0; i < count; i++) {
      const text = await headings.nth(i).textContent();
      expect(text.toLowerCase()).not.toContain('purple');
    }
  });

  test('should not contain forbidden phrase "where art meets"', async ({ page }) => {
    const text = await page.locator('body').textContent();
    expect(text.toLowerCase()).not.toContain('where art meets');
  });

  test('should not contain forbidden phrase "step into a world"', async ({ page }) => {
    const text = await page.locator('body').textContent();
    expect(text.toLowerCase()).not.toContain('step into a world');
  });

  test('should not contain forbidden phrase "immersive experience"', async ({ page }) => {
    const text = await page.locator('body').textContent();
    expect(text.toLowerCase()).not.toContain('immersive experience');
  });

  test('should not contain forbidden phrase "cutting-edge"', async ({ page }) => {
    const text = await page.locator('body').textContent();
    expect(text.toLowerCase()).not.toContain('cutting-edge');
  });

  test('should not contain forbidden phrase "revolutionary"', async ({ page }) => {
    const text = await page.locator('body').textContent();
    expect(text.toLowerCase()).not.toContain('revolutionary');
  });

  test('should use "Dayjah" as public name', async ({ page }) => {
    const text = await page.locator('body').textContent();
    expect(text).toContain('DAYJAH');
  });

  test('no element should have purple background color', async ({ page }) => {
    const hasPurple = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const bg = getComputedStyle(el).backgroundColor;
        if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;
        const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!match) continue;
        const [, r, g, b] = match.map(Number);
        if (r > 100 && b > 100 && g < 80) return true;
      }
      return false;
    });
    expect(hasPurple).toBe(false);
  });

  test('no element should have pure white background (#fff)', async ({ page }) => {
    const hasWhite = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg === 'rgb(255, 255, 255)') return true;
      }
      return false;
    });
    expect(hasWhite).toBe(false);
  });

  test('background should be dark', async ({ page }) => {
    const bg = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    expect(match).toBeTruthy();
    if (match) {
      const [, r, g, b] = match.map(Number);
      expect(r).toBeLessThan(60);
      expect(g).toBeLessThan(60);
      expect(b).toBeLessThan(60);
    }
  });
});

test.describe('Brand Compliance - All Rooms', () => {
  ALL_ROOMS.forEach(room => {
    test(`${room} nav and headings should not contain "Storm"`, async ({ page }) => {
      const hash = room === 'home' ? '' : room;
      await page.goto(`/#${hash}`);
      await page.waitForTimeout(1500);
      const navText = await page.locator('.site-nav').textContent();
      expect(navText.toLowerCase()).not.toContain('storm');
      const headings = page.locator('h1, h2, h3');
      const count = await headings.count();
      for (let i = 0; i < count; i++) {
        const text = await headings.nth(i).textContent();
        expect(text.toLowerCase()).not.toContain('storm');
      }
    });
  });
});
