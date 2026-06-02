# QA Checklist — Dayjah

## Brand integrity

- [ ] No "Storm" visible anywhere in the public-facing UI
- [ ] No old AI names visible
- [ ] Dayjah is the only public-facing name
- [ ] No purple present in the palette
- [ ] No AI branding or references
- [ ] No trauma content
- [ ] No religious framing
- [ ] No sexually suggestive content

## Visual

- [ ] Entrance feels like a threshold, not a homepage
- [ ] All rooms have distinct visual character
- [ ] Gallery avoids sterile white-cube aesthetic
- [ ] Objects section does not feel like a cheap shop
- [ ] Colour palette follows tokens (no purple, no generic black)
- [ ] Textures present (paper grain overlay visible)
- [ ] Warmth present in backgrounds and accents

## Functionality

- [ ] Entrance sequence works (wordmark reveal, line, invitation)
- [ ] Clicking "Enter" triggers room transition
- [ ] Room cards navigate to correct rooms
- [ ] Compass navigation shows after entrance
- [ ] Compass navigation switches rooms correctly
- [ ] Gallery overlay opens on piece click
- [ ] Gallery overlay shows correct title and meta
- [ ] Gallery overlay closes on ESC
- [ ] Gallery overlay closes on outside click
- [ ] Gallery overlay close button works
- [ ] Objects email form accepts input
- [ ] Contact form accepts input
- [ ] All navigation works via keyboard (Tab, Enter, Space)
- [ ] Focus management works on room switch
- [ ] Skip link appears on first Tab press

## Responsive

- [ ] Works at 320px width
- [ ] Works at 768px width (tablet)
- [ ] Works at 1024px width
- [ ] Works at 1920px width (desktop)
- [ ] No horizontal scroll on any viewport
- [ ] Touch targets ≥ 44px on mobile
- [ ] Navigation usable on mobile (icon-only mode)

## Accessibility

- [ ] Keyboard-only navigation works throughout
- [ ] Focus indicators visible on all interactive elements
- [ ] `prefers-reduced-motion` respected (all animations instant)
- [ ] All images have meaningful `alt` text
- [ ] ARIA labels on navigation buttons
- [ ] Gallery overlay has `role="dialog"` and `aria-modal`
- [ ] Skip link works on focus
- [ ] No essential content hidden behind hover only

## Performance

- [ ] All images use `loading="lazy"`
- [ ] CSS is under 50KB total
- [ ] No unnecessary JavaScript
- [ ] No broken image paths
- [ ] All SVG assets load correctly
- [ ] Page loads quickly on local development

## Content

- [ ] No clichés ("where art meets", "step into a world", etc.)
- [ ] Tone is warm, human, slightly poetic
- [ ] Text is minimal — no walls of copy
- [ ] Spelling and grammar are correct
- [ ] All placeholder text replaced with real content
- [ ] Email addresses and form actions are set correctly

## Cross-browser

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

## Pre-launch final checks

- [ ] Test with actual images replaced (if available)
- [ ] Test on real mobile device
- [ ] Test screen reader (VoiceOver / NVDA)
- [ ] Run Lighthouse audit (target 90+ in all categories)
- [ ] Verify no console errors
- [ ] Verify all links work
- [ ] Verify Vercel/GitHub Pages deployment works
- [ ] Confirm custom domain (if applicable)
