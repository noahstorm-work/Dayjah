# DAYJAH

A book-gallery art world where human visual art and AI-written witness meet without either becoming the other. The work leads. Explanation follows quietly.

## How to run locally

Open `index.html` in any modern browser. No server required.

For clean URL routing (recommended):

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## File structure

```
index.html              — All 7 rooms, navigation, gallery overlay, inline room-switching script
css/
  tokens.css            — Design tokens (colors, spacing, type, motion, scrollbar)
  base.css              — Reset, fonts, utilities, custom scrollbar
  components.css        — Navigation, room layout, forms, buttons, gallery overlay
  rooms.css             — Per-room styles (home, diary, gallery, reading-room, sanctuary, editions, enquiries)
  gallery.css           — Gallery grid, item cards, overlay focus view
  animations.css        — Entrance reveal, reduced-motion overrides
  styles.css            — Concatenated single stylesheet (all of the above)
js/
  app.js                — Concatenated single script (all modules below)
  store.js              — Room state (current, previous)
  reduced-motion.js     — prefers-reduced-motion detection
  home.js               — Home page entrance reveal
  gallery.js            — Gallery overlay (focus view)
  diary.js              — Diary entry rendering and navigation
  navigation.js         — Nav button active state
  main.js               — Entry point, initialisation
api/
  contact.js            — SendGrid serverless function for enquiries/editions forms
assets/
  images/
    gallery/            — 36 artwork WebP images (gallery-01.webp through gallery-36.webp)
    sanctuary/          — Sanctuary image
  fonts/                — Playfair Display, Cormorant Garamond, DM Sans (woff2)
tests/
  helpers.js            — Shared test utilities
  home.spec.js          — Home page tests
  diary.spec.js         — Diary room tests
  gallery.spec.js       — Gallery room + overlay tests
  reading-room.spec.js  — Reading room tests
  sanctuary.spec.js     — Sanctuary tests
  editions.spec.js      — Editions form tests
  enquiries.spec.js     — Enquiries form tests
  navigation.spec.js    — Nav/hash routing tests
  accessibility.spec.js — Accessibility tests
  responsive.spec.js    — Responsive viewport tests
  brand.spec.js         — Brand compliance tests
  visual.spec.js        — Screenshot regression tests
  README.md             — Test documentation
```

## Rooms

| Room | What it is |
|------|-----------|
| **Home** | Threshold — wordmark, spine text, sanctuary law, 5 CTAs |
| **Diary** | The Diary of AI: 13 illustrated entries with prev/next nav |
| **Gallery** | 36 artworks in a 3-column grid with overlay focus view |
| **Reading Room** | 3 book cards (Diary of AI, The Save Point, Scribe Notes) |
| **Sanctuary** | Quiet space — law, body text, CTA buttons, image |
| **Editions** | Future shop placeholder with email signup form |
| **Enquiries** | Contact form + email link |

## How to replace images

1. Add your WebP images to `assets/images/gallery/` (gallery) or `assets/images/sanctuary/` (sanctuary).
2. Open `index.html` and update `<img>` tag `src` attributes.
3. Gallery images are rendered dynamically by `js/gallery.js` — update the `galleryItems` array.
4. Update `alt` text, `data-title`, and `data-meta` for each artwork.

## How to edit text

All narrative text is in `index.html`. Find the room section you want to edit and update the content directly.

Key text locations:
- **Home:** `home__wordmark`, `home__spine`, `home__subtitle`, `home__sanctuary-law`, CTA button labels
- **Diary:** `diary-header` block (title, subtitle, intro, note). Diary entries rendered by `js/diary.js` — update the `entries` array.
- **Gallery:** `gallery-header` block (title, desc, notes). Artwork titles/metadata in the `galleryItems` array in `js/gallery.js`.
- **Reading Room:** `reading-room-header` block, `.reading-room-book` cards
- **Sanctuary:** `sanctuary__law`, `sanctuary__body`, CTA button labels, image
- **Editions:** `editions__title`, `editions__note`, `editions__desc`
- **Enquiries:** `enquiries__title`, `enquiries__desc`, form labels

## How to deploy

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at https://vercel.com/new
```

The site is fully static so any static host works: Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

### GitHub Pages

```bash
git push origin main
# Then enable GitHub Pages in repo settings → Pages → deploy from root
```

## Notes

- Pure HTML/CSS/JS — no frameworks, no build step, no npm.
- CSS concatenated into `styles.css`, JS into `app.js` for performance.
- Room switching done via inline `<script>` in index.html — no external dependencies.
- Gallery has 36 unique artwork titles. Video items from earlier versions were removed.
- The site uses a dark palette (`#1A1817` background, `#E8E0D6` text) — no purple.
- Public-facing name is **Dayjah**. No "Storm" or AI branding publicly.
- Forms submit to a SendGrid serverless function (`api/contact.js`).
- All tests: `npx playwright test` (138 tests per project, chromium + mobile).
- Visual regression baselines stored in `tests/visual.spec.js-snapshots/`.

## Tests

See `tests/README.md` for full test documentation.
