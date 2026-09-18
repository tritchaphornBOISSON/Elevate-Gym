# Elevate Gym design direction

## Approved visual references

The following mockups are the approved visual source of truth for the
homepage layout, composition, hierarchy, and responsive behavior:

- `docs/references/approved-homepage-desktop.png`
- `docs/references/approved-homepage-mobile.png`

Use these files together with this document. They are visual references, not
approved sources for business facts, final copy, photography rights, color
values, or font licensing; the content guardrails in `AGENTS.md`,
`docs/BRAND.md`, and `docs/ARCHITECTURE.md` still apply.

## Experience principles

- Editorial and fitness-led, not a software landing page.
- Bold hierarchy with controlled whitespace and few, purposeful elements.
- Dark, energetic sections balanced by warm cream and white.
- Champagne-gold accents are sparse and functional.
- Motion should be subtle, optional, and respectful of reduced-motion
  preferences.

## Homepage structure

Keep this approved order:

1. Navigation
2. Hero
3. The Gym with carousel
4. Membership preview
5. Contact/location invitation
6. Footer

Do not insert statistics, testimonials, feature grids, trainer profiles, app
promotions, or other unapproved sections.

## Responsive layout

### Desktop

- Hero: photograph on the left and text on the right. Do not add a central
  divider.
- The Gym: text on the left and carousel on the right.

### Mobile

- Use 32px between major sections unless a documented curve/image transition
  intentionally joins two sections.
- Keep both hero buttons side by side. Together they should occupy roughly
  85–90% of the available width; preserve usable labels and tap targets.
- Membership uses a warm-cream ribbon with curved top and bottom edges.
- The contact photograph starts directly below the cream curve. Do not insert
  a gray or black band.
- Place contact text directly on the photograph. Use a subtle text shadow or
  a very soft transparent gradient only when the image requires it for
  readability.
- Center the footer and add a short champagne-gold underline beneath the
  wordmark.

## Component-specific notes

### Navigation

Provide routes for Home, Gym, Memberships, and Contact. Mobile navigation
behavior is **[To be confirmed: menu presentation and interaction]**.

### Carousel

- Navigation is manual with no autoplay.
- Use gold previous and next arrow controls. Controls must be keyboard
  accessible and have accessible names.
- Loop infinitely and support swipe gestures on touch devices.
- Keep the active image largest, with two equal preview images at
  approximately 60% scale.
- Use a smooth, restrained transition.
- Do not display dots, counters, or captions.
- The final image sequence remains **[To be confirmed]**.

### Membership preview

Show the four provisional pass options without implying terms, inclusions,
renewal, payment methods, or availability. Source all values from the shared
structured membership data described in `docs/ARCHITECTURE.md`.

### Contact and footer

The contact invitation may show only confirmed location/contact details.
Until then, use explicit placeholders. The footer includes “Follow us” and
Facebook, Instagram, and TikTok placeholders; do not link them to guessed
profiles.

## Pending design inputs

- Approved logo/wordmark assets and usage rules
- Exact color tokens and typefaces
- Final photography, rights, crops, focal points, and alt text
- Final copy and calls to action
- Confirmed contact and social information
