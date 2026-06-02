# Project Notes — Dayjah

## Concept

Dayjah is not a portfolio. Not a gallery template. Not a corporate art site.

Dayjah is a song. The mediums are instruments. The website is a place — a strange, warm, elegant destination where visitors wander through rooms, look at work, and feel something.

Core idea: A stylish Art Shop for adults. A place where grown-ups are allowed to wonder again.

## Emotional goal

Visitors should feel within the first 30 seconds:

- I am not alone.
- I am seen.
- I am valued.
- I feel quietly hugged.
- I want to wander.

The underlying emotional direction: freedom, acceptance, wonder, exploration, curiosity, warmth, art escaping the frame.

## Site structure

```
ENTRANCE  →  dark threshold, slow reveal, "Come in. Sit down."
ROOMS     →  exploration hub, 4 doorways (Gallery, Garden, Objects, About)
GALLERY   →  one-piece-at-a-time focus view, grid + overlay
GARDEN    →  breathing space, text, single image
OBJECTS   →  future shop placeholder with email capture
ABOUT     →  maker introduction, minimal, mysterious
CONTACT   →  simple form or email
```

## Room logic

- **Entrance** is the only room shown on load. All others are hidden (`.room.active`).
- Navigation (compass) appears only after entrance is completed.
- Room switching is done via JS (Router/Transitions). The current room fades out, the target fades in.
- The browser URL hash updates via `history.pushState` for deep linking.
- The gallery overlay is a separate layer above rooms (higher z-index). It opens on click, closes on ESC or outside click.

## Future expansion notes

### Adding new rooms
1. Add the room ID to `Store.state.rooms` in `js/store.js`.
2. Add a new `<section>` in `index.html` with `data-room="your-room"`.
3. Add CSS in `css/rooms.css`.
4. Add a nav button in the `.compass-nav` in `index.html`.
5. Add `Transitions.getRoomBg()` entry in `js/transitions.js`.

### Shop / Objects
- The Objects section is a placeholder. When the shop is ready, replace the form with a product listing.
- Consider a simple JSON data file for products that JS renders.

### Image replacement
- SVG placeholders are in `assets/images/` per room.
- Replace with WebP or JPEG of appropriate size (optimise first).
- Each gallery item needs: `src`, `data-title`, `data-meta`, `alt` text.

### Analytics
- Add a simple analytics snippet (e.g., Plausible, Fathom) to `<head>` when ready.
- Keep it privacy-respecting.

### Dark mode
- The site already uses a warm palette. A dark variant could be added with `prefers-color-scheme: dark` media query in `tokens.css`.

## Design constraints

- **No purple.** The palette is warm earth tones, bone, charcoal, olive, gold.
- **No AI branding.** Dayjah is the artist identity. No Storm, no AI collaborator names.
- **No trauma content.** The site is about the work and the feeling, not biography.
- **Not about the artist as celebrity.** The work leads.
- **Must hold many styles.** Dayjah is not one fixed visual style. The design system accommodates digital art, fine art, clay, marble, steel, architecture, clothing, objects.

## Build approach

- Pure HTML/CSS/JS. No frameworks, no bundlers, no npm.
- Single `index.html` with JS-driven room switching.
- All CSS in separate files under `css/` for maintainability.
- All JS as separate scripts (ES5-compatible for wide support).

## Tech debt / improvements

- [ ] Real form backend for Contact (currently alerts on submit)
- [ ] Email capture for Objects (currently alerts on submit)
- [ ] Self-host fonts for production
- [ ] Add image meta JSON data file for easier gallery management
- [ ] Consider View Transitions API for smoother browser-native transitions
