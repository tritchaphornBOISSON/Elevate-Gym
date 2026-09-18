<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Elevate Gym project instructions

## Read before changing the project

- Read `README.md`, `docs/BRAND.md`, `docs/DESIGN.md`, and
  `docs/ARCHITECTURE.md` before planning or implementing product work.
- Treat those documents as the current product source of truth. If a request
  conflicts with them, call out the conflict rather than silently choosing.
- Before writing Next.js code, read the relevant guide in the installed
  `node_modules/next/dist/docs/` tree as required above. Do not rely on older
  Next.js conventions.
- Inspect the current repository state before editing and preserve unrelated
  user changes.

## Product scope

Elevate Gym is a premium fitness marketing website for a gym in Pattaya. The
initial public routes are Home, Gym, Memberships, and Contact.

The current scope does **not** include authentication, member accounts,
payments, QR access, or an admin system. Do not introduce backend or account
infrastructure in anticipation of those features.

## Content guardrails

- Never invent an address, opening date, hours, facilities, equipment,
  trainers, accessibility information, membership terms, payment methods,
  social profile URLs, testimonials, statistics, or performance claims.
- Use an explicit, visible placeholder for any unconfirmed content. Prefer
  `[To be confirmed: …]` in copy/data over plausible filler.
- Pass prices are provisional. Keep them in one typed structured-data source
  with an explicit `provisional: true` field; do not duplicate them in page
  components.
- Facebook, Instagram, and TikTok are placeholders until URLs are supplied.

## Implementation conventions

- Use the App Router and TypeScript. Pages belong in `app/`; shared UI and
  structured content should be kept outside route files in focused modules.
- Prefer Server Components. Add `"use client"` only at the smallest boundary
  that needs state, event handlers, or browser APIs, such as a carousel.
- Use `next/link` for internal navigation, `next/image` for photographs, and
  `next/font` for approved fonts. Give every route unique metadata and one
  descriptive `h1`.
- Use Tailwind CSS and centralize design tokens in `app/globals.css`. Avoid
  scattered one-off brand colors and font declarations.
- Build semantic, keyboard-accessible controls with visible focus states,
  useful image alternative text, sufficient contrast, and reduced-motion
  support where motion is introduced.
- Do not add a dependency unless the task requires it and the user approves
  the addition. Prefer platform and existing framework capabilities.

## Quality checks

For implementation work, run `npm run lint` and `npm run build` before
claiming completion. Check affected layouts at mobile and desktop sizes, and
report any check that could not be run.
