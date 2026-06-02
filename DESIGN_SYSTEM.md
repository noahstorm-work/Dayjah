# Design System — Dayjah

## Colours

| Token | Value | Usage |
|---|---|---|
| `--c-dusk` | `#1A1817` | Warm off-black — dark backgrounds, entrance |
| `--c-charcoal` | `#2A2825` | Deep charcoal — body text, dark sections |
| `--c-slate` | `#4A4A48` | Muted slate — secondary text, borders |
| `--c-bone` | `#F5F0E8` | Bone — main page background |
| `--c-cream` | `#E8E0D6` | Aged cream — secondary backgrounds |
| `--c-linen` | `#DDD5CA` | Linen — subtle borders, dividers |
| `--c-gold` | `#C4A265` | Soft amber/gold — accents, highlights |
| `--c-gold-light` | `#D4BC8A` | Lighter gold — hover states |
| `--c-clay` | `#C67A5A` | Earth/clay — secondary accents |
| `--c-blush` | `#D9B8A4` | Soft warmth — hover backgrounds |
| `--c-rain` | `#2A3038` | Rain-dark blue — depth accents |
| `--c-moss` | `#7A8B6F` | Moss/olive — nature accents (Garden) |
| `--c-stone` | `#9A938A` | Stone — muted text, icons |
| `--c-steel` | `#8A8782` | Brushed steel — subtle metallic |
| `--c-warm-white` | `#FAF7F2` | Warm white — card backgrounds |

**No purple.** Not even in shadows.

## Typography

| Purpose | Typeface | Style |
|---|---|---|
| Display / headings | Cormorant Garamond | Light weight (300), italic where noted |
| Body text | DM Sans | Regular (400), 1.6 line-height |
| Small / captions | DM Sans | 0.875rem, letter-spaced |

**Scale:** 0.75rem → 0.875rem → 1rem → 1.125rem → 1.5rem → 2rem → 3rem → 4.5rem → 6rem

**Google Fonts:** Both fonts loaded from Google Fonts via `@import` in `base.css`.

**Self-hosting:** For production, download and self-host both fonts under `assets/fonts/` to eliminate external requests.

## Spacing

Base unit: 8px

Scale: 4, 8, 16, 24, 32, 48, 64, 96, 128, 192 (px)

Intimate max-width of 960px for content. Narrow sections (About, Contact) at 640px.

Desktop padding: 6rem. Tablet: 3rem. Mobile: 1.5rem.

## Texture language

- **Paper grain:** Subtle SVG noise overlay on all pages (`texture-overlay` div at 3% opacity).
- **Warm shadows:** Box shadows use warm black (`rgba(26, 24, 23, ...)`) instead of cool grey.
- **Blurred depth:** Gallery overlay uses `backdrop-filter: blur(24px)` for atmospheric depth.
- **Thin borders:** 1px lines in `--c-linen` for card separation — not harsh.

## Motion rules

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Entrance reveal | 2000ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Wordmark fade + blur, line reveal |
| Room transition | 600ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Opacity fade on current + target |
| Hover (cards) | 600ms | ease-out | Scale 1→1.02, translate Y |
| Hover (gallery) | 300ms | ease-out | Scale 1→1.05 |
| Gallery overlay | 600ms | ease-out | Backdrop fade, content scale |
| Breathing | 6000ms | ease-in-out | Subtle opacity pulse on entrance |

**Rule:** Only use `transform` and `opacity` for animations (GPU-accelerated).

**Reduced motion:** All animations become instant opacity fades when `prefers-reduced-motion: reduce` is detected. No information is delayed or hidden.

## Image treatment

- Images sit within the page as objects, not full-bleed backgrounds.
- Soft, warm borders. No forced uniformity — an oil painting and a pencil drawing are treated differently.
- Gallery items have a warm overlay gradient on hover (`.gallery-item__info`).
- All images use `loading="lazy"` for performance.
- Aspect ratios are respected, not forced into a grid.

## Accessibility rules

- Semantic HTML: `main`, `nav`, `section`, `article`, `button`, `form`, `label`.
- Keyboard-navigable: all interactive elements are buttons or links.
- Focus management: when a room changes, focus moves to the room heading.
- `prefers-reduced-motion` respected throughout.
- Skip link: "Skip to main content" appears on first Tab.
- Gallery overlay: focus trap, close on ESC, `aria-modal="true"`.
- Alt text on all images.
- No essential content behind hover only.
- WCAG 2.1 AA contrast ratios.
- ARIA labels on navigation and interactive elements.

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥ 1024px | Full room experience, two-column grids, generous space |
| 768–1023px | Single-column, reduced padding, compact navigation |
| < 768px | Stacked layout, icon-only navigation, shorter transitions |

## Brand voice

- Minimal, poetic but not pretentious, slightly strange, human, warm.
- Forbidden: "where art meets", "step into a world", "immersive experience", "cutting-edge", "revolutionary".

## Implementation

- Pure HTML/CSS/JS. No frameworks, no build step.
- Design tokens in `tokens.css` as CSS custom properties.
- All values use `var(--token-name)` for consistency.
