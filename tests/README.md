# Tests

E2E tests for Dayjah using Playwright.

## Running

```bash
npx playwright test
```

## Test files

| File | What it covers |
|------|---------------|
| `entrance.spec.js` | Entrance reveal, wordmark, tagline, Enter button, room transition |
| `navigation.spec.js` | Compass navigation, room cards, all 6 rooms |
| `gallery.spec.js` | Gallery grid, overlay open/close (ESC, button, outside click) |
| `forms.spec.js` | Objects email form, Contact form — validation and submission |
| `accessibility.spec.js` | Skip link, heading hierarchy, alt text, keyboard focus, aria labels, reduced motion |
| `responsive.spec.js` | Mobile (375px) and tablet (768px) viewports |

## Configuration

`playwright.config.js` — runs against `https://dayjah.co.uk` in Chromium headless + iPhone 13 mobile emulation.
