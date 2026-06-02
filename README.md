# Dayjah

A stylish toyshop for adults. A place for work that would not stay in one shape.

A premium, modern, emotionally warm web experience — a destination with rooms, not a template.

## How to run locally

Open `index.html` in any modern browser. No server required.

For clean URL routing (recommended):

```bash
npx serve .
# or
python -m http.server 8000
# or
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File structure

```
index.html              — All rooms, entrance, navigation, gallery overlay
css/
  tokens.css            — Design tokens (colours, spacing, type, motion)
  base.css              — Reset, base typography, utilities
  components.css        — Navigation, gallery overlay, forms, buttons
  rooms.css             — Per-room styles (entrance, gallery, garden, etc.)
  animations.css        — Transitions, reveals, reduced-motion
js/
  store.js              — Simple state management
  reduced-motion.js     — prefers-reduced-motion detection
  router.js             — Room switching + history.pushState
  entrance.js           — Entrance reveal sequence
  transitions.js        — Room transition orchestration
  gallery.js            — Gallery overlay (focus view)
  navigation.js         — Compass/doorway nav system
  main.js               — Entry point, initialisation
assets/
  images/
    drawing-room/       — Line art, monochrome pieces
    cabinet/            — Small, intimate works
    long-gallery/       — Larger, atmospheric pieces
    garden/             — Landscape / view imagery
    ambient/            — Textures, background elements
```

## How to replace images

1. Add your image files (SVG, WebP, JPEG, PNG) to the appropriate `assets/images/<room>/` folder.
2. Open `index.html` and find the room section you want to edit.
3. Replace the `<img>` tag `src` attribute with your new file path.
4. Update `alt` text, `data-title`, and `data-meta` attributes.
5. If adding new gallery items, copy an existing `.gallery-item` block and update its attributes.

## How to edit text

All text is in `index.html`. Find the room section you want to edit and update the content directly.

Key text locations:
- **Entrance:** `entrance__line`, `entrance__sub`, `entrance__invitation`
- **Rooms hub:** `rooms-header__title`, `rooms-header__desc`, `.room-card` contents
- **Gallery:** `gallery-header` block, `gallery-item` data attributes
- **Garden:** `garden__text-title`, `garden__text-body`
- **Objects:** `objects__title`, `objects__desc`
- **About:** `.about__text` paragraphs
- **Contact:** `contact__desc`, `contact__email-link`

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

- Pure HTML/CSS/JS — no frameworks, no build step.
- The shop (Objects) is a placeholder. Update the form action and email address for production.
- SVG art assets are included as placeholders. Replace with your own art.
- The site is designed to hold many styles without forcing them into one cage.
- No purple in the palette. No AI branding. Dayjah is the public identity.
