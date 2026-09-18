# Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan inline, one checkpoint at a time. Do not use subagents. Stop after every checkpoint for review and explicit approval before continuing. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generated starter page with the approved responsive Elevate Gym homepage while keeping all unconfirmed business content explicit and non-functional.

**Architecture:** Keep `app/page.tsx` as a Server Component that composes focused server-rendered sections. Isolate browser state in two small Client Components: `GymCarousel` for carousel state, input handling, and reduced-motion behavior, and `MobileNavigation` for the disclosure menu. Use Tailwind utilities for component layout and responsive styling, reserve `app/globals.css` for shared foundations and otherwise-unwieldy effects, store provisional prices and concept-image status in typed modules, and preserve image geometry with neutral placeholders until licensed assets and alt text exist.

**Tech Stack:** Next.js 16.3.5 App Router, React 19, TypeScript, Tailwind CSS 4, CSS custom properties, `next/link`, `next/image`, and `next/font`; no new dependencies.

**Spec:** `docs/DESIGN.md`, supported by `docs/BRAND.md`, `docs/ARCHITECTURE.md`, `AGENTS.md`, `docs/references/approved-homepage-desktop.png`, and `docs/references/approved-homepage-mobile.png`.

## Global Constraints

- Treat `docs/references/approved-homepage-desktop.png` and `docs/references/approved-homepage-mobile.png` as the approved visual source of truth for homepage layout, composition, hierarchy, and responsive behavior.
- Preserve the approved order: Navigation, Hero, The Gym with carousel, Membership preview, Contact/location invitation, Footer.
- Do not add authentication, member accounts, payments, QR access, an admin system, a CMS, a database, route handlers, or speculative backend infrastructure.
- Do not invent an address, opening date, hours, facilities, equipment, trainers, accessibility information, membership terms, payment methods, social URLs, testimonials, statistics, or performance claims.
- Omit unconfirmed facts from the polished homepage rather than inserting `[To be confirmed: …]` labels into the approved design. Mockup text is not automatically approved copy or business information.
- Keep all pass prices in `content/memberships.ts` with `provisional: true`; never duplicate price literals in a component or render visible provisional-pricing microcopy. The site must not launch publicly until prices are confirmed.
- Use App Router and TypeScript, Server Components by default, and `"use client"` only in `components/home/gym-carousel.tsx` and `components/layout/mobile-navigation.tsx`.
- Use `next/link` for the current in-page destinations `#gym`, `#membership`, and `#contact`; do not link to unfinished routes. Use `next/image` when a licensed local photograph exists. Do not fetch remote images at runtime.
- Use Tailwind CSS utilities in component markup for layout, spacing, typography, responsive behavior, focus states, and ordinary transitions.
- Limit `app/globals.css` to CSS design tokens, font variables, base/reset styling, reusable curved-section treatments, and keyframes or styles that cannot be expressed cleanly with Tailwind. Do not create a monolithic component stylesheet.
- Use replaceable CSS font variables backed initially by open-source implementation fonts loaded through `next/font`; mark those font choices as provisional until final typography is approved.
- Derive initial color tokens from the approved mockups and document them as implementation tokens pending final brand confirmation.
- Mobile major-section spacing is exactly `32px` (`2rem`) unless the approved curved membership/image transition intentionally joins adjacent sections.
- Use Tailwind's `lg` breakpoint (`1024px`) for the primary desktop composition while keeping widths below it fluid.
- Do not add a dependency. Implement carousel looping, keyboard control, and swipe with React and browser pointer events.
- The carousel is manual only: no autoplay, dots, visible counter, or captions.
- Preserve unrelated user changes, including the approved reference images already present under `docs/references/`.
- Keep concept-image status in typed metadata and documentation only. Neutral placeholders must not display `[To be confirmed]` text, badges, or concept-image overlays, and no alt text may be invented.
- Use a text-based Elevate Gym wordmark until an approved logo asset exists.
- Render Privacy and Terms as non-interactive text or omit them until their routes and content exist; never use `href="#"`.
- Execute this plan inline without subagents. After each checkpoint, report verification evidence and stop until the user explicitly approves the next checkpoint.
- Before implementation, read the relevant installed Next.js 16 guides under `node_modules/next/dist/docs/`, especially Server and Client Components, linking, images, fonts, metadata, and accessibility.

---

## Approved responsive interpretation

The desktop reference uses a wide editorial canvas: an overlaid wordmark and pill navigation; a hero split between a left photograph and right headline; a two-column Gym section; a full-width curved cream membership ribbon; a contact image with copy on its left; and a single-row footer. The mobile reference stacks the hero and Gym copy, keeps the two hero actions side by side, presents the carousel as one dominant image plus two equal smaller previews, changes memberships to a two-by-two price grid, overlays contact copy on the photograph, and centers the footer.

The expanded mobile menu is not shown in the approved reference. The approved implementation is a non-modal disclosure panel: the hamburger toggles a dark panel immediately below the header with Home, Gym, Memberships, and Contact links in one vertical list. It does not trap focus. `Escape`, a selected link, or a viewport transition to desktop closes it and returns focus when appropriate.

The reference composites must never be shipped as page backgrounds or cropped into production photographs. Until separately licensed image files, rights, focal points, and alt text are supplied, render restrained neutral placeholders that preserve the approved image dimensions, crops, and hierarchy. Keep `concept: true` in typed metadata and documentation only; display no labels, badges, or overlays and invent no alt text. Browser comparison must evaluate layout, crop containers, hierarchy, and responsive proportions while explicitly reporting photography as a blocked difference.

## File map

| File | Change | Responsibility |
| --- | --- | --- |
| `package.json` | Modify | Add a dependency-free `typecheck` script using the installed TypeScript compiler. |
| `app/layout.tsx` | Modify | Replace starter metadata/font setup with the shared document shell and open-source provisional fonts wired through replaceable CSS variables. |
| `app/page.tsx` | Modify | Define unique homepage metadata and compose the six approved homepage parts. |
| `app/globals.css` | Modify | Own only design/font tokens, base/reset rules, reusable curved-section treatments, and effects or keyframes that Tailwind cannot express cleanly. |
| `content/memberships.ts` | Create | Export the required `MembershipPass` type, readonly provisional prices, and the presentation formatter. |
| `content/site.ts` | Create | Export typed navigation, placeholder social/legal items, approved safe copy, and carousel/concept-image descriptors. |
| `components/ui/action-link.tsx` | Create | Render reusable internal CTA links with consistent button variants and decorative arrow treatment. |
| `components/ui/arrow-icon.tsx` | Create | Render the small directional SVG used by CTAs and carousel buttons without an icon dependency. |
| `components/ui/editorial-image.tsx` | Create | Render `next/image` for licensed local assets or a restrained neutral geometry-preserving placeholder with no visible status label. |
| `components/layout/site-header.tsx` | Create | Server-render the wordmark/home link, desktop navigation, and the mobile client boundary. |
| `components/layout/mobile-navigation.tsx` | Create | Own only mobile-menu open state, focus return, Escape handling, and disclosure semantics. |
| `components/layout/site-footer.tsx` | Create | Render footer navigation plus disabled/placeholder social and legal items without fake URLs. |
| `components/home/hero-section.tsx` | Create | Render the responsive hero composition and two side-by-side mobile CTAs. |
| `components/home/gym-section.tsx` | Create | Server-render Gym copy and pass serializable slide data into `GymCarousel`. |
| `components/home/gym-carousel.tsx` | Create | Own only active-slide state, looping, pointer swipe, keyboard control, and transition preference. |
| `components/home/membership-preview.tsx` | Create | Render all four prices from typed provisional data without adding public-facing provisional microcopy. |
| `components/home/contact-section.tsx` | Create | Render the contact invitation using confirmed copy only over the image container. |
| `public/images/home/` | Create only when licensed assets exist | Hold separately licensed homepage photographs; never copy the reference composites here. |

Do not create empty route folders for `/gym`, `/memberships`, or `/contact` as part of this homepage task. All current homepage navigation and CTA destinations use `#gym`, `#membership`, or `#contact` so no control links to an unfinished route.

### Task 1: Establish typed content and global foundations

**Files:**

- Modify: `package.json`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `content/memberships.ts`
- Create: `content/site.ts`

**Interfaces:**

- Produces: `MembershipPass`, `membershipPasses`, and `formatPriceThb(priceThb: number): string`.
- Produces: readonly `primaryNavigation`, `footerNavigation`, `socialItems`, `legalItems`, and `gymSlides` arrays whose items have stable literal IDs.
- Produces: global CSS design tokens and replaceable font variables; components consume them through Tailwind utilities rather than global component selectors.

- [ ] **Step 1: Read the installed Next.js 16 guidance before writing framework code**

Read these local files in full and honor current APIs and deprecations:

```text
node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md
node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md
node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md
node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
node_modules/next/dist/docs/03-architecture/accessibility.md
```

- [ ] **Step 2: Add a repeatable TypeScript check without installing anything**

Add this script beside the existing scripts in `package.json`:

```json
"typecheck": "tsc --noEmit"
```

Run: `npm run typecheck`

Expected: PASS against the generated starter before homepage changes.

- [ ] **Step 3: Create the single provisional membership source**

Use the exact required shape from `docs/ARCHITECTURE.md`:

```ts
export type MembershipPass = {
  id: "day" | "week" | "month" | "year";
  label: string;
  priceThb: number;
  provisional: true;
};

export const membershipPasses = [
  { id: "day", label: "Day", priceThb: 250, provisional: true },
  { id: "week", label: "Week", priceThb: 1000, provisional: true },
  { id: "month", label: "Month", priceThb: 1500, provisional: true },
  { id: "year", label: "Year", priceThb: 15000, provisional: true },
] as const satisfies readonly MembershipPass[];

export function formatPriceThb(priceThb: number): string {
  return `${new Intl.NumberFormat("en-US").format(priceThb)} THB`;
}
```

No component may contain `250`, `1000`, `1500`, or `15000` as a price literal.

- [ ] **Step 4: Create typed shared site content without inventing facts**

Define stable IDs and current-page destinations. The wordmark links to `/`; the desktop pill shows Gym, Memberships, and Contact as in the reference, while the mobile disclosure explicitly includes Home. The three section destinations are exactly `#gym`, `#membership`, and `#contact`. Model unavailable external/legal targets without fake URLs:

```ts
type PlaceholderLink = {
  label: string;
  href: null;
  status: "to-be-confirmed";
};

type GymSlide = {
  id: string;
  src: null;
  alt: null;
  concept: true;
};
```

Keep `concept: true` and `provisional: true` in typed data and documentation, not in visible homepage labels. Keep social and legal targets `null` until supplied; do not render anchors for null targets. Use only confirmed restrained copy; omit unknown facts instead of inserting `[To be confirmed]` into the polished design.

- [ ] **Step 5: Replace starter tokens and metadata defaults**

In `app/globals.css`, define semantic design tokens sampled from the approved mockups and annotate them as provisional implementation tokens pending final brand confirmation. Include the charcoal ground, warm cream, white, champagne-gold accent, peach accent, and replaceable font variables. Keep only base/reset rules, reusable curved-section treatments, and effects that are materially clearer in CSS than Tailwind utilities. Use Tailwind classes—including `gap-8`/`py-8` where they represent the approved 32px mobile rhythm—for component layout, spacing, type, responsive behavior, focus states, and ordinary transitions. Do not add global selectors for individual header, hero, carousel, membership, contact, or footer components.

Add one reduced-motion block that removes non-essential transitions and smooth scrolling:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

In `app/layout.tsx`, remove the Create Next App metadata. Load the open-source implementation fonts `Geist` for display/body and `Cormorant_Garamond` for italic accents through `next/font/google`. Expose them through `--font-display`, `--font-body`, and `--font-accent` so final approved typography can replace them without component rewrites, and document both choices as provisional. Set `lang="en"` and shared Elevate Gym metadata without adding unsupported claims.

- [ ] **Step 6: Verify the data and foundation checkpoint**

Run:

```bash
npm run typecheck
npm run lint
```

Expected: both commands exit 0; search confirms each price literal occurs only in `content/memberships.ts`, `provisional: true` remains typed, no dependency changed, and `app/globals.css` contains no component-specific stylesheet blocks.

Checkpoint gate: report the changed files and command results, then stop for review and explicit approval. Do not begin Task 2 until approved.

### Task 2: Build shared image, arrow, and action primitives

**Files:**

- Create: `components/ui/arrow-icon.tsx`
- Create: `components/ui/action-link.tsx`
- Create: `components/ui/editorial-image.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: semantic global tokens from Task 1.
- Produces: `ArrowIcon({ direction }: { direction: "left" | "right" })`.
- Produces: `ActionLink({ href, children, variant, arrowLabel })` for the valid in-page section IDs.
- Produces: `EditorialImage` accepting either a licensed local image with alt text or a neutral concept placeholder with no invented alternative text.

- [ ] **Step 1: Implement dependency-free arrows**

Create a small inline SVG using `currentColor`. CTA instances are decorative and receive `aria-hidden="true"`; carousel buttons receive their accessible names from the surrounding `<button aria-label="Previous gym image">` or `<button aria-label="Next gym image">`, not from the SVG.

- [ ] **Step 2: Implement semantic CTA links**

Use `next/link` because the actions navigate rather than submit. Support only the visual variants needed by the references:

```ts
type ActionLinkProps = {
  href: "#gym" | "#membership" | "#contact";
  children: React.ReactNode;
  variant: "light" | "outline" | "dark" | "text";
  arrowLabel?: string;
};
```

Express variants, layout, spacing, typography, responsive behavior, hover, and `focus-visible` states with Tailwind utilities. Give every variant a minimum 44px touch height and sufficient contrast. Keep the two hero actions in a two-column row on mobile, together occupying roughly 85–90% of the content width; allow type size/padding to adapt without truncating labels.

- [ ] **Step 3: Implement honest concept-image handling**

Use an interface that cannot silently turn a missing asset into decorative content:

```ts
type EditorialImageProps =
  | {
      src: StaticImageData;
      alt: string;
      concept?: false;
      sizes: string;
      preload?: boolean;
      objectPosition?: string;
      className?: string;
    }
  | {
      src: null;
      alt: null;
      concept: true;
      sizes: string;
      className?: string;
    };
```

When `src` is present, render `next/image` in a correctly constrained relative wrapper, use `fill`, pass `sizes`, and require approved meaningful alt text unless the image is genuinely decorative. Use the Next.js 16 `preload` prop only for the above-the-fold hero; do not use the deprecated `priority` prop. When `src` is null, render an `aria-hidden="true"` restrained neutral surface that preserves the approved aspect ratio, crop box, and hierarchy. Display no `[To be confirmed]` text, badge, icon, status overlay, or invented alt text. Use Tailwind utilities for the wrapper and placeholder styling. Never use the two approved full-page mockups as `src`.

- [ ] **Step 4: Verify the primitive checkpoint**

Run:

```bash
npm run typecheck
npm run lint
```

Expected: both commands exit 0; in-page navigation uses the three approved fragment IDs, placeholders expose no invented accessible description or visible status label, and there are no image imports from `docs/references/`.

Checkpoint gate: report the changed files and command results, then stop for review and explicit approval. Do not begin Task 3 until approved.

### Task 3: Build the header and accessible mobile navigation

**Files:**

- Create: `components/layout/site-header.tsx`
- Create: `components/layout/mobile-navigation.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: `primaryNavigation` from `content/site.ts`.
- Produces: server-rendered `SiteHeader` and the narrowly scoped client `MobileNavigation`.

- [ ] **Step 1: Render the shared header as a Server Component**

Place the header over the hero as in both references. Render “Elevate Gym” as a text-based wordmark and descriptive Home link until an approved logo asset exists, include the short champagne-gold underline, and use a semantic `<nav aria-label="Primary navigation">`. At `lg` and above, render the three section links inside the outlined pill. Do not add `"use client"` to `site-header.tsx`; use Tailwind utilities for all ordinary header layout and styling.

- [ ] **Step 2: Implement only the mobile disclosure interaction on the client**

`mobile-navigation.tsx` owns `open` state and refs; it receives serializable navigation items as props. The hamburger is a real button with a minimum 44px target, visible focus style, `aria-expanded`, `aria-controls`, and an accessible name that changes between “Open navigation menu” and “Close navigation menu.” The approved non-modal disclosure panel appears directly below the header, lists Home plus `#gym`, `#membership`, and `#contact`, closes on link activation and `Escape`, and returns focus to the trigger after Escape. Do not implement a modal, focus trap, animation library, or full-screen menu.

- [ ] **Step 3: Match responsive header behavior**

Use Tailwind's `lg` breakpoint (`1024px`): at `lg` and above, hide the disclosure trigger and show the pill navigation; below `lg`, hide the pill and show the hamburger while keeping tablet widths fluid. Prevent an open mobile panel from remaining visually present when the desktop media query takes effect. Ensure the header remains legible over the image/placeholder without adding an unapproved opaque band.

- [ ] **Step 4: Verify keyboard and responsive behavior**

Run `npm run typecheck` and `npm run lint`, then in the browser verify:

1. Tab reaches the wordmark and hamburger in logical order.
2. Enter/Space toggles the menu.
3. `aria-expanded` tracks the visible panel.
4. Escape closes the panel and returns focus.
5. All four routes are keyboard reachable in the open panel.
6. Resizing to desktop removes the mobile panel from layout.

Checkpoint gate: report the changed files and command/browser results, then stop for review and explicit approval. Do not begin Task 4 until approved.

### Task 4: Build the hero and page composition shell

**Files:**

- Create: `components/home/hero-section.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: `SiteHeader`, `EditorialImage`, and `ActionLink`.
- Produces: a server-rendered `HeroSection` containing the page's single descriptive `h1`.

- [ ] **Step 1: Create the semantic hero**

Use `<section aria-labelledby="home-heading">` and one `h1`. Use “Train. Progress. Elevate.” only if that exact headline is approved before this checkpoint; otherwise use the existing working name “Elevate Gym” as the `h1` while preserving the approved hierarchy. Omit unapproved supporting copy instead of rendering a `[To be confirmed]` label. Link the two actions to `#membership` and `#gym`.

- [ ] **Step 2: Implement the two responsive compositions**

At Tailwind `lg` (`1024px`) and above, use a two-column composition with the image container on the left and text on the right; do not add a central divider. Below `lg`, keep tablet widths fluid and stack the image-led hero with copy over or immediately below the lower image area according to the reference. Keep both mobile CTAs side by side and preserve usable labels/tap targets. Use Tailwind utilities for grid, spacing, responsive type, and sizing; reserve `clamp()` or custom CSS only where Tailwind cannot express the approved fluid scaling cleanly. Use stable aspect-ratio/minimum-block-size utilities to prevent layout shift.

- [ ] **Step 3: Replace the starter page with a server composition shell**

Add unique homepage metadata in `app/page.tsx`, render `<SiteHeader />` and `<main>`, and mount `HeroSection` first. Keep `app/page.tsx` free of state, effects, browser APIs, and `"use client"`.

- [ ] **Step 4: Verify the hero checkpoint**

Run `npm run typecheck` and `npm run lint`. In the browser, compare the hero at the reference aspect ratios and confirm one `h1`, no horizontal overflow at 320px, both mobile CTA labels remain visible, and the header/hero reading order is logical without CSS.

Checkpoint gate: report the changed files and command/browser results, then stop for review and explicit approval. Do not begin Task 5 until approved.

### Task 5: Build the Gym section and isolated carousel client boundary

**Files:**

- Create: `components/home/gym-section.tsx`
- Create: `components/home/gym-carousel.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: readonly serializable `gymSlides` descriptors from `content/site.ts`.
- Produces: `GymSection` as a Server Component and `GymCarousel({ slides }: { slides: readonly GymSlide[] })` as a Client Component.

- [ ] **Step 1: Render Gym copy on the server**

Create `<section id="gym">` with an `h2`, eyebrow, concise approved body copy, and a `#gym` CTA that targets the current section rather than an unfinished route. Omit unapproved copy instead of showing a placeholder label. At `lg`, place copy left and carousel right; below `lg`, keep widths fluid and stack copy above carousel. Use Tailwind utilities for component layout and styling. Do not move section copy or image data into the client file.

- [ ] **Step 2: Implement deterministic infinite looping**

In `gym-carousel.tsx`, add `"use client"` and keep only the minimal browser behavior. Use one `activeIndex` and modular arithmetic:

```ts
const wrapIndex = (index: number, length: number) =>
  (index + length) % length;

const previous = () =>
  setActiveIndex((index) => wrapIndex(index - 1, slides.length));

const next = () =>
  setActiveIndex((index) => wrapIndex(index + 1, slides.length));
```

Require at least three slide descriptors in the typed content. Until licensed images exist, each slide renders the neutral concept placeholder defined in Task 2 without visible status text or invented alt text. Render the active slide largest and the previous/next previews at equal approximately 60% visual scale. Reorder presentation from the derived indices; do not clone a large track or add autoplay timers. Express the size relationships and responsive arrangement with Tailwind utilities where practical.

- [ ] **Step 3: Add controls and keyboard semantics**

Wrap the visual set in a focusable `role="region"` with `aria-roledescription="carousel"` and an accessible label. Use gold previous/next `<button type="button">` controls with visible focus rings and `aria-label`s. Left Arrow selects previous and Right Arrow selects next while focus is within the carousel. Let Enter/Space retain native button behavior. Add an `aria-live="polite"` visually hidden status such as “Gym image 2 of 3”; the mockup's ban on displayed counters remains intact.

- [ ] **Step 4: Add pointer swipe without blocking vertical page scroll**

Track horizontal pointer start/end positions, use pointer capture, and change slides only after a deliberate horizontal threshold (for example 48px) where horizontal travel exceeds vertical travel. Set `touch-action: pan-y`; cancel on `pointercancel`; ignore non-primary mouse buttons; and preserve arrow-button click behavior. Do not depend on a gesture package.

- [ ] **Step 5: Respect reduced motion**

Use a short transform/opacity transition in normal mode. Under `prefers-reduced-motion: reduce`, switch slide arrangements without perceptible animation. The carousel must remain fully operable with motion disabled.

- [ ] **Step 6: Verify the carousel checkpoint**

Run `npm run typecheck` and `npm run lint`, then verify in the browser:

1. Previous from the first item wraps to the last; next from the last wraps to the first.
2. Arrow keys work when the region is focused.
3. Controls have accessible names and visible focus.
4. Horizontal touch/pointer swipes change exactly one slide; vertical scroll still works.
5. No autoplay, dots, visible counters, or captions appear.
6. The client boundary contains only carousel interaction, not the whole Gym section or page.
7. Reduced-motion emulation removes the transition without removing functionality.

Checkpoint gate: report the changed files and command/browser results, then stop for review and explicit approval. Do not begin Task 6 until approved.

### Task 6: Build the membership ribbon from structured prices

**Files:**

- Create: `components/home/membership-preview.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: `membershipPasses` and `formatPriceThb` from `content/memberships.ts`.
- Produces: a server-rendered four-option membership preview whose provisional status remains in typed data and documentation, not visible homepage microcopy.

- [ ] **Step 1: Render one semantic pricing list**

Create `<section id="membership">` and map over `membershipPasses`; do not restate price values in JSX. Use a list or definition-list structure with the pass label and formatted price. Keep `provisional: true` in typed data and documentation, but render no “provisional pricing” label or microcopy in the polished homepage. Do not imply inclusions, renewal, payment methods, availability, or terms. Link the CTA to `#membership`. Record a release gate that the site must not be launched publicly until every price is confirmed and the typed status is deliberately updated.

- [ ] **Step 2: Match the ribbon layouts**

Use Tailwind utilities for the warm-cream surface, text, spacing, and responsive price grid. At `lg`, present four equal columns separated by restrained rules; below `lg`, keep tablet widths fluid and use the approved two-by-two mobile grid with a subtle central cross, centered heading, and CTA below. Put only the reusable curved top/bottom treatment in `app/globals.css` when pseudo-elements, `clip-path`, or an equivalent effect would be materially unclear in utilities; hide decorative curves from the accessibility tree and avoid bitmap curve assets.

- [ ] **Step 3: Enforce the 32px mobile rhythm and joined transitions**

Use Tailwind's 32px spacing utilities (`gap-8`, `py-8`, or equivalent directional utilities) for mobile section content and unjoined major-section gaps. The Gym-to-membership and membership-to-contact boundaries are intentional curve/image joins, so do not insert an extra gray/black strip or 32px external gap there. The contact photograph/neutral placeholder begins directly below the lower cream curve.

- [ ] **Step 4: Verify structured-data and layout behavior**

Run:

```bash
npm run typecheck
npm run lint
rg '250|1000|1500|15000' app components content
```

Expected: checks pass; every price literal appears only in `content/memberships.ts`; `provisional: true` remains present in typed data; no provisional label appears in rendered output; and the browser shows four options in one row at `lg` and a fluid two-by-two grid below it.

Checkpoint gate: report the changed files, command/browser results, and the unresolved public-launch pricing gate, then stop for review and explicit approval. Do not begin Task 7 until approved.

### Task 7: Build the contact invitation and footer without fake destinations

**Files:**

- Create: `components/home/contact-section.tsx`
- Create: `components/layout/site-footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: typed navigation, social, legal, and image descriptors from `content/site.ts`.
- Produces: a server-rendered contact section and footer.

- [ ] **Step 1: Create the image-backed contact invitation**

Create `<section id="contact">` with an `h2`, a `#contact` CTA, and only confirmed content. Pattaya/Thailand wording may come from the existing project descriptor; omit any unconfirmed exact address, hours, map, email, phone, or other contact detail rather than displaying placeholder text. Position text directly over the neutral image container below `lg` and over the left side of the desktop composition at `lg`. Use Tailwind utilities for layout and typography. Use a subtle text shadow or very soft transparent gradient only when needed for contrast; if that effect cannot be expressed cleanly with utilities, keep the minimal reusable effect in `app/globals.css`. Do not insert a band between the cream curve and contact image.

- [ ] **Step 2: Create a semantic responsive footer**

Use `<footer>`, a home-linked text wordmark, `<nav aria-label="Footer navigation">`, a “Follow us” group, and an optional legal group. At `lg`, use the reference's horizontal distribution; below `lg`, keep widths fluid, center every group, and draw the short champagne-gold underline beneath the wordmark. Express layout, spacing, type, and responsive behavior with Tailwind utilities.

- [ ] **Step 3: Keep social and legal placeholders honest**

Facebook, Instagram, and TikTok have no confirmed URLs. Render any approved icon treatment as non-anchor content with accessible names; do not use guessed profiles, empty buttons, or fake destinations. Render Privacy and Terms as non-interactive placeholder text, or omit them entirely until real routes and content exist. Never use `href="#"`. When URLs/routes are later approved, change the typed data and let the footer render real links; external links must then use safe `rel` values where applicable.

- [ ] **Step 4: Verify contact/footer behavior**

Run `npm run typecheck` and `npm run lint`. In the browser confirm no unconfirmed detail is presented as fact, there are no fake clickable targets, footer focus order follows visual order, social icons have accessible names, and the mobile footer is centered with the approved underline.

Checkpoint gate: report the changed files and command/browser results, then stop for review and explicit approval. Do not begin Task 8 until approved.

### Task 8: Complete the page composition and responsive polish

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify as findings require: files created in Tasks 2–7

**Interfaces:**

- Consumes: all homepage sections and layout components.
- Produces: the complete server-rendered `/` route in the approved six-part order.

- [ ] **Step 1: Compose the final route in source order**

The page should read structurally as:

```tsx
<>
  <SiteHeader />
  <main>
    <HeroSection />
    <GymSection />
    <MembershipPreview />
    <ContactSection />
  </main>
  <SiteFooter />
</>
```

Keep `app/page.tsx` and all components except the two named client boundaries server-rendered. Confirm there is exactly one `h1`; section headings descend logically.

Confirm that ordinary component layout, spacing, typography, focus states, and responsive rules live in Tailwind class lists. Keep `app/globals.css` restricted to tokens/font variables, base/reset rules, shared curved-section treatments, reduced-motion/keyframes, and effects that cannot be expressed cleanly with utilities.

- [ ] **Step 2: Tune desktop behavior against the approved desktop mockup**

At Tailwind `lg` (`1024px`) and a wider desktop viewport, compare: content max-width; hero split; no central divider; header pill position; Gym text/carousel balance; active versus 60%-scale previews; curve depth; four-column membership rhythm; contact overlay; footer distribution; and absence of overflow. Keep tablet widths below `lg` fluid. Prefer Tailwind's grid, sizing, aspect-ratio, and responsive utilities over screenshot-specific CSS; use `min()`, `max()`, or `clamp()` only when utilities cannot cleanly reproduce the approved fluid behavior.

- [ ] **Step 3: Tune mobile behavior against the approved mobile mockup**

At the 806px source-image proportion and practical browser widths of 320px, 375px, 430px, and representative tablet widths below 1024px, compare: stacked hero crop container; side-by-side CTA width; 32px major-section rhythm; Gym copy above carousel; one dominant plus two equal previews; two-by-two membership grid; direct cream-curve-to-contact-image transition; contact copy on image; and centered footer. Confirm no label truncation, overlap, abrupt tablet breakpoint behavior, or horizontal scroll.

- [ ] **Step 4: Audit semantic HTML and accessibility**

Check all of the following:

- Landmarks are `header`, labeled `nav`, `main`, sectioning elements, and `footer`.
- The page has one descriptive `h1` and logical `h2` headings.
- All controls and links have accessible names and at least 44px touch targets.
- Focus indicators are visible on dark, cream, image, and light surfaces.
- Contrast remains sufficient over every neutral placeholder/final-image treatment.
- Decorative SVGs/curves are hidden from assistive technology.
- Informative images have useful alt text; decorative images use empty alt text.
- The menu and carousel are fully keyboard operable.
- Reduced-motion mode removes non-essential animation.
- The page remains understandable with CSS disabled and at 200% zoom.

- [ ] **Step 5: Run a production-sized checkpoint**

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit 0; the build reports `/` successfully and does not introduce unexpected dynamic rendering or dependency warnings.

Checkpoint gate: report the changed files and all verification results, then stop for review and explicit approval. Do not begin Task 9 until approved.

### Task 9: Perform final browser comparison and repository checks

**Files:**

- Modify as findings require: homepage files from Tasks 1–8
- Do not modify: `docs/references/approved-homepage-desktop.png`
- Do not modify: `docs/references/approved-homepage-mobile.png`

**Interfaces:**

- Produces: verification evidence and a concise list of expected visual gaps, with photography explicitly reported as blocked until licensed individual images are available.

- [ ] **Step 1: Start the production server for browser verification**

After a successful build, run:

```bash
npm run start
```

Open `/` in a browser. Use browser devtools or the in-app browser to set deterministic desktop and mobile viewports; do not install a screenshot-testing package.

- [ ] **Step 2: Compare against both approved references**

Capture a full-page desktop screenshot and compare it side by side with `docs/references/approved-homepage-desktop.png`. Capture a full-page mobile screenshot and compare it side by side with `docs/references/approved-homepage-mobile.png`. Verify section order, vertical rhythm, compositions, curves, carousel scale relationships, CTA placement, contact overlay, footer alignment, and responsive transitions. Explicitly report photography as a blocked visual difference because neutral placeholders remain until individual licensed images, focal points, and alt text are supplied. Record any remaining provisional font/color/copy differences; do not “fix” them by inventing assets or facts.

- [ ] **Step 3: Exercise interactive and accessibility states**

Use keyboard-only navigation, a touch-capable viewport, reduced-motion emulation, 200% zoom, and narrow-width testing. Exercise mobile menu open/close/Escape, carousel previous/next wrap, Arrow Left/Right, swipe in both directions, and focus visibility across every interactive element.

- [ ] **Step 4: Run the final automated checks from a clean terminal**

Run:

```bash
npm run lint
npm run typecheck
npm run build
git diff --check
git status --short
```

Expected: lint, TypeScript, production build, and whitespace checks all pass. `git status --short` lists only the intended homepage implementation and documentation/reference inputs; there are no new dependencies or copied/cropped reference images.

- [ ] **Step 5: Report completion with evidence and remaining confirmations**

Report command outcomes, the desktop/mobile/tablet viewport sizes inspected, carousel/menu/accessibility checks performed, and any deviations from the references. Explicitly report photography as blocked. Keep the remaining confirmation list explicit: logo asset, final typography, final color-token confirmation, photography/rights/focal points/alt text, final copy/CTAs, contact details, social URLs, legal routes/content, and confirmation that provisional membership prices are approved for public launch.

Checkpoint gate: report all final evidence and stop for review and explicit approval. Do not declare the homepage ready for public launch while `provisional: true` remains on any membership price or photography remains blocked.

## Completion criteria

- `/` follows the approved six-part order and visually tracks both approved mockups at desktop and mobile sizes.
- Server Components render all static layout/content; only `GymCarousel` and `MobileNavigation` are client boundaries.
- Membership prices come exclusively from typed data with `provisional: true`; no provisional-pricing microcopy is visible, and public launch remains blocked until prices are confirmed.
- Mobile unjoined section spacing is 32px; curved Gym/membership/contact transitions remain directly joined.
- Concept-image status remains in typed metadata/documentation; restrained neutral placeholders preserve approved geometry without visible status labels, overlays, or invented alt text.
- Carousel controls loop, swipe, and work from the keyboard without autoplay, dots, visible counters, captions, or a new dependency.
- Current navigation and CTAs use `#gym`, `#membership`, and `#contact`; Privacy and Terms are non-interactive text or omitted, and no fake destination exists.
- Component layout, spacing, typography, and responsive behavior use Tailwind utilities; `app/globals.css` remains limited to tokens/font variables, base/reset styling, reusable curves, reduced-motion/keyframes, and otherwise-unwieldy effects.
- The primary desktop composition begins at Tailwind `lg` (`1024px`) and tablet widths remain fluid.
- The wordmark remains text-based, implementation fonts remain replaceable/provisional, and color tokens are documented as derived from the approved mockups pending final confirmation.
- Focus, contrast, heading structure, alt text, touch targets, zoom, and reduced-motion behavior are verified.
- `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` pass.
- Full-page browser comparisons against both approved mockups are completed, with photography explicitly reported as a blocked visual difference.
- Implementation was executed inline without subagents and stopped for review and explicit approval after every checkpoint.
