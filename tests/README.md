# Tests

E2E tests for Dayjah using Playwright.

## Running

```bash
npx playwright test
npx playwright test --project=chromium
npx playwright test --project=mobile
```

## Test files

| File | What it covers |
|------|---------------|
| `helpers.js` | Shared utilities: `loadRoom`, `waitForReveal`, `openGalleryOverlay`, `closeGalleryOverlay` |
| `home.spec.js` | Wordmark, spine, subtitle, sanctuary law, CTA buttons, hero image, reveal sequence |
| `diary.spec.js` | Diary header, entries, prev/next nav, dots, counter |
| `gallery.spec.js` | 36 items, overlay open/close (ESC, button, outside click), title/meta, keyboard |
| `reading-room.spec.js` | 3 books, titles, descriptions, status labels |
| `sanctuary.spec.js` | Law text, body paragraphs, CTA buttons, sanctuary image |
| `editions.spec.js` | Title, note, description, email form validation |
| `enquiries.spec.js` | Form fields, validation, email link |
| `navigation.spec.js` | Nav buttons, active state, hash routing, back button |
| `accessibility.spec.js` | Skip link, ARIA, keyboard, headings, alt text, reduced motion |
| `responsive.spec.js` | Mobile/tablet/desktop viewports, scrollbar detection |
| `brand.spec.js` | No Storm, no purple, no forbidden phrases, dark background |
| `visual.spec.js` | Screenshot regression for all rooms + gallery overlay |

## Configuration

`playwright.config.js` — runs against `http://localhost:3000` via `npx serve . -l 3000` in Chromium + iPhone 13 mobile emulation.
