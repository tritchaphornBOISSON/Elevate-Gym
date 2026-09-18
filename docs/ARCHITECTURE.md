# Elevate Gym architecture

## Current foundation

The repository is a `create-next-app` project using:

- Next.js 16.3.5 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9 with `eslint-config-next`

The current UI is still the generated starter page. This document defines the
intended initial marketing-site structure; it does not claim those routes or
components already exist.

## Initial routes

| Route | Purpose |
| --- | --- |
| `/` | Home: approved six-part marketing flow |
| `/gym` | Gym overview using confirmed content only |
| `/memberships` | Provisional pass pricing and confirmed terms only |
| `/contact` | Confirmed contact/location information only |

Use `app/layout.tsx` for the shared document shell and global metadata
defaults. Give each page unique, descriptive metadata. Keep the navigation and
footer visually consistent across routes.

## Recommended organization

```text
app/
  layout.tsx
  page.tsx
  gym/page.tsx
  memberships/page.tsx
  contact/page.tsx
components/
  layout/
  sections/
  ui/
content/
  memberships.ts
  site.ts
public/
  images/
```

This is a target shape, not a requirement to create empty folders. Route files
should compose focused sections; shared layout/UI belongs in `components/`,
and factual content that appears in multiple places belongs in `content/`.

## Rendering and interaction

Use Server Components by default. Keep static copy, pricing, layout, and
metadata server-rendered. Isolate browser state in the smallest Client
Component possible—for example, the carousel controls or an interactive
mobile menu.

Use current Next.js 16 conventions from the installed documentation:
`next/link` for internal routes, `next/image` with known dimensions or a
correctly constrained `fill` parent, and `next/font` for approved fonts. Do
not add data fetching, route handlers, or a content system without a concrete
requirement.

## Structured membership data

When the membership UI is implemented, define one typed source in
`content/memberships.ts`. The required data shape is:

```ts
type MembershipPass = {
  id: "day" | "week" | "month" | "year";
  label: string;
  priceThb: number;
  provisional: true;
};

const membershipPasses: readonly MembershipPass[] = [
  { id: "day", label: "Day", priceThb: 250, provisional: true },
  { id: "week", label: "Week", priceThb: 1000, provisional: true },
  { id: "month", label: "Month", priceThb: 1500, provisional: true },
  { id: "year", label: "Year", priceThb: 15000, provisional: true },
];
```

Formatting such as `1,000 THB` belongs in a presentation helper. Both the
homepage preview and Memberships page must consume this source. Display a
visible provisional qualifier until prices are confirmed.

## Content model and placeholders

Keep shared facts in a small typed `content/site.ts` module when implemented.
Unknown values must remain explicit placeholders, not realistic sample data.
This applies to address, opening date, hours, facilities, equipment, trainers,
accessibility, terms, payment methods, social URLs, testimonials, statistics,
and performance claims.

The Contact page is informational until contact actions and submission
behavior are confirmed. Do not create a functional form, backend, or fake map
location by assumption.

## Out of scope

No authentication, member account, payments, QR access, admin system, CMS,
database, or private API is planned for the initial marketing site. Adding any
of these requires an explicit scope and architecture decision.
