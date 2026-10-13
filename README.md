# RESERVA

A premium, minimal Resource Reservation Management System for the PrimeWave Lab
Software Engineering Internship technical assessment.

## Current scope

Next.js App Router, TypeScript, and Tailwind CSS foundation with a shared workspace
layout, a converted landing page, a dashboard, resource details, a reservation form,
and an availability timeline using sample
data. Routes and static presentation use Server Components; navigation state,
filters, view switching, and preview dialogs use focused Client Components.
Authentication, APIs, Prisma, and Supabase PostgreSQL will be added in
later stages; no credentials or environment variables are required yet.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use a Node.js version supported by the installed Next.js
release (see `node_modules/next/package.json`, `engines`).

## Project structure

```text
src/
  app/
    layout.tsx                 Root layout, fonts, and metadata
    globals.css                Tailwind import and semantic design tokens
    page.tsx                   Landing page composition, font, and metadata
    (workspace)/
      layout.tsx               Shared workspace layout; group is absent from URLs
      dashboard/page.tsx        /dashboard — sample overview and booking filters
      resources/page.tsx        /resources — searchable sample catalog
      resources/executive-meeting-room-4a/page.tsx  Supplied room details
      reservations/page.tsx     /reservations — future management entry
      reservations/new/page.tsx /reservations/new — reservation preview form
      availability/page.tsx     /availability — selectable sample timeline
  components/
    landing/                   Landing sections and scoped presentation styles
    dashboard/                 Overview and interactive reservation filters
    resources/                 Resource cards and interactive catalog controls
    reservations/              Quick reservation and full preview form
    availability/              Server-rendered timeline with React slot selection
    layout/dashboard-shell.tsx  Responsive navigation and content shell
    ui/page-placeholder.tsx    Shared placeholder presentation
  lib/navigation.ts            Shared navigation configuration
  services/                    Reserved for future business logic
  types/                       Shared navigation and UI preview types
```

Keep route entry points thin and reusable UI in `components`. Use `lib` for shared
configuration, utilities, and future infrastructure clients; `services` for business
logic; and `types` for types shared across modules. Component-specific props stay
with their component. Future backend endpoints belong in `src/app/api/**/route.ts`.

Use Server Components by default and introduce small Client Components only when
interaction requires them. Use the existing `@/*` alias for imports from `src`.

## Design foundation

`globals.css` exposes semantic Tailwind colors: `background`, `foreground`,
`surface`, `muted`, `border`, `accent`, `accent-hover`, and `accent-foreground`.
Use these tokens with Tailwind's spacing, type, and radius utilities. The foundation
uses a light neutral palette, green accent, Geist typography, and visible keyboard
focus. Navigation wraps on smaller screens without JavaScript.

The landing page preserves the supplied HTML design, using additional ivory,
forest, emerald, and charcoal Tailwind tokens, custom shadows, and a Newsreader
serif font loaded with `next/font`. Its navigation uses native section anchors
and a mobile disclosure menu. Main calls to action open `/dashboard` through
Next.js `Link`. Sign in is marked as coming soon. The schedule is an illustrative,
inert sample preview; its controls do not perform bookings or synchronization.

The dashboard and resource catalog preserve the supplied workspace designs.
`workspace-theme.css` imports their type and spacing scales and uses `ws-` color
tokens to avoid changing the landing theme. Icons are local SVG components. Resource
photographs retain the supplied external URLs and use `next/image` with optimization
disabled; no external image configuration was added.

Resource filters combine search, category, current availability, capacity, and floor.
Counts reflect the six supplied sample cards; there is no fake pagination for the
original 32-resource mockup. Escape clears the search; Reset clears all filters.
Grid and list presentations use the same server-rendered cards. The dashboard
supports All Today, My Bookings, and Team Bookings filters. Resource details and
deferred operations use accessible native dialogs. No preview action creates a
booking, checks a user in, contacts another user, or stores data.

Resource details include a gallery, specifications, a sample schedule, and a quick
form that continues to `/reservations/new`. The supplied details apply to Room 4A;
other sample catalog resources retain their details dialogs. Booking links prefill
the full form with the selected resource and, when available, its date and times.
URL-dependent form controls are wrapped in Suspense for production prerendering.

The reservation form updates its summary, checks overlapping sample intervals,
offers alternative resources/times, and supports undo. Sample hours are 08:00–18:00
with a four-hour maximum booking. Adjacent intervals do not conflict. The timeline
supports keyboard slot selection, category/location filters, and date navigation.
Only October 24, 2026 has a loaded example schedule; other dates show that
availability is unverified. Shared sample rules live in `src/lib/booking-preview.ts`.
Confirm Reservation prepares a preview only; Save Draft retains current page state
without persistence. Neither operation performs a database write, sends invitations,
or claims that a real resource has been reserved.

Tailwind is already compiled by the `@tailwindcss/turbopack` loader in
`next.config.ts`; no additional PostCSS setup is needed. The existing Next.js
configuration, including Cache Components and partial prefetching, is preserved.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

Type checking generates Next.js route types before running TypeScript. The starter's
`next/font/google` setup fetches Geist fonts during a fresh build, so internet access
is needed for that step. Run `npm start` after a successful build to serve production.

Dependencies are unchanged from the starter. The npm audit at initialization reported
an ESLint development dependency advisory; `npm audit --omit=dev` reported zero
production vulnerabilities. Recheck audits as dependencies evolve and review proposed
changes before using `npm audit fix --force`.
