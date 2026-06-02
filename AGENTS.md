# AGENTS.md — Dayjah

## Brand identity (never violate)
- Public-facing name: **Dayjah** only. Never use "Storm" or any AI name publicly.
- Dayjah is a song. Mediums are instruments. The site must hold many styles without forcing them into one cage.
- No purple. No AI branding. No trauma content. Not about the artist as celebrity — the work leads.

## Core emotional rules
Visitors must feel: not alone / seen / valued / quietly hugged / want to wander.
The site is a **place with rooms**, not a template. Entrance is a threshold — "Come in. Sit down. You are welcome here."

## Build conventions
- Pure HTML/CSS/JS. No frameworks, no bundlers, no npm.
- Site is a single `index.html` with JS-driven room switching (`[data-room]` sections).
- No placeholder images. Curate assets into room-themed folders under `assets/images/`.
- No generic grids, no masonry galleries, no black-luxury or sterile-white-gallery looks.

## File structure
```
index.html         — all rooms + links to css/ js/
css/tokens.css     — design tokens (colors, spacing, type)
css/base.css       — reset + base typography
css/components.css — reusable components (nav, overlays, gallery)
css/rooms.css      — all room-specific styles (hub, garden, objects, about, contact)
css/gallery.css    — gallery grid, item cards, overlay info
css/animations.css — transitions, entrance, motion
js/main.js         — entry point, imports all modules
js/store.js        — room state (current, previous)
js/router.js       — room switching + history.pushState
js/entrance.js     — entrance reveal sequence
js/transitions.js  — room transition orchestration
js/gallery.js      — overlay focus view
js/navigation.js   — compass/doorway nav system
js/reduced-motion.js — prefers-reduced-motion detection
assets/images/     — sorted into room subfolders
```

## Commands
- Open `index.html` in a browser to view (no server needed for static).
- For local dev: `npx serve .` or Python `http.server` for clean routing.

## Visual system
- **Palette:** warm off-black (`#1A1817`), deep charcoal (`#2A2825`), rain-dark blue (`#1E2428`), bone (`#E8E0D6`), aged cream (`#C9BFA8`), amber/gold (`#C4A265`), oxidised bronze (`#8B7D5E`), moss/olive (`#5A6B4F`), weathered wood (`#6B5B4E`), clay (`#A6745C`), stone (`#8A847A`). No purple.
- **Atmosphere:** dark warm backgrounds with spotlight effects, radial gold glow on entrance, paper grain overlay, warm shadows.
- **Textures:** rain glass (blur), paper grain (SVG noise), stone, clay, brushed metal, soft shadow, warm low-light.
- **Typography:** Cormorant Garamond (display), DM Sans (body) — Google Fonts.
- **Motion:** slow entrance reveal, gentle room transitions (fade+scale), gallery opens like discovered object with warm spotlight. No spinning 3D, no particles, no loud effects.
- **Tagline:** "Every day belongs to truth." — appears in entrance sequence.
- **Reduced motion:** detect `prefers-reduced-motion`, all animations become instant opacity fades.

## Accessibility rules
- Semantic HTML (`main`, `nav`, `section`, `article`, `button`).
- Keyboard-navigable. Focus management on room switch.
- `prefers-reduced-motion` respected throughout.
- No essential content behind hover only.
- Alt text on all images.

## Room system
- `entrance` — threshold, dark warm screen, slow reveal on click/wait
- `rooms` — exploration hub with 3-4 thematic chambers
- `gallery` — one-piece-at-a-time focus view
- `garden` — breathing space, texts, single image
- `objects` — future shop placeholder with email capture
- `about` — maker introduction, brief, human
- `contact` — minimal form or email

## Content tone
Minimal, poetic but not pretentious, slightly strange, human, warm.
Forbidden: "where art meets", "step into a world", "immersive experience", "cutting-edge", "revolutionary".

## QA must-check
- No Storm branding visible
- No purple in palette
- All images load (no broken paths)
- Works keyboard-only
- Reduced motion works
- Responsive at 320px–1920px
- Gallery opens/closes smoothly
- Entrance sequence works
- Room transitions feel like moving through space
