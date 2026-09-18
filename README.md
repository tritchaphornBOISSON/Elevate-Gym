# Elevate Gym

Marketing website for **Elevate Gym** — **Gym · Pattaya**.

The project is currently the generated application foundation. The planned
initial pages are Home, Gym, Memberships, and Contact; their design has not yet
been implemented.

## Stack

- Next.js 16.3.5 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9

## Local development

Install the existing dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run build
```

## Project documentation

- [Brand direction](docs/BRAND.md)
- [Design and responsive rules](docs/DESIGN.md)
- [Architecture and content model](docs/ARCHITECTURE.md)
- [Instructions for coding agents](AGENTS.md)

Read these documents before implementation. The installed Next.js 16 guides
in `node_modules/next/dist/docs/` are the framework source of truth for future
code changes.

## Scope

The initial release is a public marketing site only. Authentication, member
accounts, payments, QR access, and an admin system are explicitly out of scope.

Membership prices are provisional and must remain centralized in typed
structured data. Unconfirmed business details must use explicit placeholders;
do not invent them.
