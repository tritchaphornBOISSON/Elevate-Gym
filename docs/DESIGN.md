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

The Gym-section copy shown in both references is specifically approved: the
eyebrow “THE GYM,” title “BUILT FOR REAL TRAINING,” description “A complete
training environment designed for strength, movement and meaningful
progress.”, and CTA “DISCOVER THE GYM.”

The approved hero headline is “TRAIN. PROGRESS. Elevate.” and the approved
description is “A premium destination gym built for real training, meaningful
progress and a stronger you.” Preserve the reference's sans-serif headline
with limited italic-serif emphasis on “Elevate.”

Use these temporary concept-photography assets during implementation:

- `public/images/concept/hero-concept.png`
- `public/images/concept/gym-main-concept.png`
- `public/images/concept/gym-preview-equipment-concept.png`
- `public/images/concept/gym-woman-rdl-concept.png`
- `public/images/concept/gym-preview-weights-concept.png`
- `public/images/concept/gym-squat-rack-concept.png`
- `public/images/concept/gym-dumbbells-concept.png`

All seven images are temporary concept photography and must be replaced by
approved, licensed final photography before launch.

## Experience principles

- Editorial and fitness-led, not a software landing page.
- Bold hierarchy with controlled whitespace and few, purposeful elements.
- Dark, energetic sections balanced by warm cream and white.
- Champagne is the single restrained accent. Use it consistently for italic
  emphasis, rules and underlines, eyebrow and CTA text, arrows, outlines,
  navigation borders, carousel controls, and focus indicators. Do not use a
  separate yellow/gold or peach accent treatment.
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

- Hero: render the photograph as one seamless, full-width image layer with the
  athlete positioned toward the left and the text composition on the right.
  Use a restrained right-side dark gradient for legibility; do not add a
  separate image panel or visible vertical divider.
- The Gym: text on the left and carousel on the right.

### Mobile

- Keep the hero photograph full-bleed with a responsive focal point that
  preserves the athlete and a restrained lower gradient behind the copy.
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
- Center the footer and add a short champagne underline beneath the
  wordmark.

## Component-specific notes

### Navigation

Provide routes for Home, Gym, Memberships, and Contact. Mobile navigation
behavior is **[To be confirmed: menu presentation and interaction]**.

### Hero and display typography

- Keep “TRAIN.” and “PROGRESS.” as the primary sans-serif structure, then size
  the italic “Elevate.” with a stronger responsive proportion so it reads as
  an integrated third line rather than a small annotation.
- Use one shared responsive section-title scale for every homepage `h2`,
  including “BUILT FOR REAL TRAINING,” “MEMBERSHIPS THAT FIT YOUR STAY,” and
  the future “COME TRAIN WITH US.” The scale is 32px by default, 36px from
  360px, 48px from 640px through `lg`, and 60px from 1280px, with a shared
  `0.92` line-height. Mixed-font phrases such as “REAL” and “YOUR STAY” inherit
  that size and line-height while retaining their champagne italic-serif style.
- Confirm the hero remains larger than section titles and the section-title
  treatment does not overflow at 320px.

### Carousel

- Navigation is manual with no autoplay.
- Use champagne previous and next arrow controls. Controls must be keyboard
  accessible and have accessible names.
- On desktop, place both controls fully outside the image group with a clear
  gap; the champagne circles must not touch or overlap image borders.
- On mobile, keep each control's interactive target at least 44×44px while
  rendering an approximately 32px visible champagne circle and a smaller
  arrow.
- Loop infinitely and support swipe gestures on touch devices.
- Use six slides in this order: seated dumbbell-curl athlete, strength
  machine, woman performing a Romanian deadlift, weight plates, squat-rack
  athlete, and dumbbell rack. Show only three slides at one time.
- On desktop, center the large active image between equal previous and next
  previews at approximately 60% scale. Calculate those slots as
  `[active - 1, active, active + 1]` with modular wrapping and keep clear,
  consistent gaps between cards.
- On mobile, center the large active image and show equal previous and next
  previews peeking from its left and right sides. Keep the champagne controls
  at the outer edges and prevent horizontal page overflow at 320px. Calculate
  those slots as `[active - 1, active, active + 1]` with modular wrapping.
- Use an approximately 450ms directional position-and-scale transition with
  `cubic-bezier(0.22, 1, 0.36, 1)` easing. Next moves the left preview out,
  shrinks the active slide into the left-preview position, grows the right
  preview into the center, and brings the following slide through the clipped
  right edge; previous reverses that movement. Swipe uses the same motion.
  Keep content visible throughout and avoid a layout jump at the infinite-loop
  boundary. Serialize rapid navigation: animate one adjacent move at a time
  and queue additional previous/next intent until the current transition
  commits.
- Under `prefers-reduced-motion: reduce`, change positions immediately without
  movement while preserving every control and status update.
- Do not display dots, counters, or captions.
- All six carousel images are temporary concept photography and require
  replacement with approved, licensed final photography before launch.

### Membership preview

Show the four provisional pass options without implying terms, inclusions,
renewal, payment methods, or availability. Source all values from the shared
structured membership data described in `docs/ARCHITECTURE.md`.

Use one semantic heading with the continuous accessible text “MEMBERSHIPS THAT
FIT YOUR STAY.” At `lg` and above, keep the complete heading on one line and
style only the inline “YOUR STAY” phrase in the champagne italic serif. Below
`lg`, use the intentional two-line composition “MEMBERSHIPS” / “THAT FIT YOUR
STAY,” keeping the bold sans “THAT FIT” and champagne italic “YOUR STAY”
together on the second line without wrapping.
Follow it with the approved description “Flexible access for a day, a week or
a longer commitment.” Use the shared homepage section-title scale for the
complete heading, including “YOUR STAY.” On desktop, size the price amounts at
approximately 42–46px without enlarging the THB labels disproportionately.

Below `lg`, use a two-by-two price grid with one continuous subtle vertical
divider and one continuous subtle horizontal divider crossing cleanly at the
center; do not render an outer border. At `lg`, use four equal columns with
subtle vertical dividers only. Keep approximately 32px between the grid and
CTA on mobile and 40px on desktop. Preserve 32px of clear space after the
carousel before the upper curve and at least 32px between the CTA and lower
curve.

Both cream curves are symmetrical, full-width, and approximately 1.5 times
deeper than the initial implementation. Keep them rounded without sharp
corners, horizontal overflow, seams, or an intervening gray/background strip.
The curves and membership surface must use the same cream token and must not
introduce borders, outlines, shadows, or uncovered layer boundaries at their
joins. Curve-boundary seams are prohibited; when the curve and surface are
separate layers, maintain a controlled 1px overlap while preserving the
approved outer curve depth. The centered cross inside the mobile price grid is
intentional and is not a curve-boundary seam.

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
