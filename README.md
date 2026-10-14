# RESERVA

Resource Reservation Management System for the PrimeWave Lab internship assessment.
Next.js App Router, TypeScript, Tailwind CSS, Prisma, Supabase PostgreSQL and Auth.

## Functionality

- Login, immediate signup without confirmation emails, and sign-out.
- Resource CRUD with safe deactivation, search, filters, and pagination.
- Persisted reservations, personal history, details, and cancellation.
- Live resource availability and dashboard counts from PostgreSQL.
- Concurrent booking protection enforced by PostgreSQL.
- Protected administrator workspace with platform statistics, resource CRUD,
  operational status controls, and reservation management across all members.

The supplied landing and workspace designs are preserved. Server Components load
data; focused Client Components handle forms, dialogs, and timeline selection.
The landing page product illustration remains an illustrative preview.

## Local setup

Copy `.env.example` to `.env`. Set the PostgreSQL session pooler URL (port 5432)
as `DATABASE_URL`, with a URL-encoded password. Set the Supabase HTTPS Project URL
and publishable key in the two `NEXT_PUBLIC_SUPABASE_*` variables. Keep passwords
and service-role keys out of public variables and Git.

```sh
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000. Disable Supabase Email Confirm email as described in
[authentication setup](docs/authentication.md). Use a Node.js version supported by
the installed Next.js version (`node_modules/next/package.json`, `engines`).
The idempotent seed creates the six original resources, preserving edits. It
creates no users or bookings. Migrations are additive; never reset a populated
database to make them pass. Prisma clients and CLI verify TLS using the public
certificate in `certs/supabase-ca.crt`. Keep this certificate in deployments.

## Structure

```text
src/app/                       Route entry points and API Route Handlers
src/app/(workspace)/           Protected dashboard, resources, reservations, availability
src/components/                Existing UI and interactive forms
src/lib/                       Auth, validation, time utilities, Prisma singleton
src/services/                  Resource and reservation business logic
src/types/                     Shared resource/navigation types
prisma/                        Schema, reviewed SQL migrations, seed resource data
```

Reservation details: `/reservations/[id]`; new bookings: `/reservations/new`.
The existing Room 4A URL remains an alias to its saved record. The generated Prisma
client is ignored and regenerated on install/build. Supabase manages identities
and sessions; the existing Prisma singleton manages application data.

## Reservation behavior

Enter/display times in Asia/Colombo; PostgreSQL stores absolute instants as
`timestamptz`. Start must be in the future and end strictly later. Overnight and
multi-day bookings work. The old sample hours/four-hour limit are not imposed.
Only ACTIVE resources can be booked. CONFIRMED bookings block overlapping intervals;
adjacent bookings are allowed. Cancel upcoming or ongoing bookings to release
slots while retaining history. Completed bookings cannot be cancelled. Repeating
cancellation preserves the original cancellation timestamp.

Every API verifies Supabase Auth. Ownership comes from the session and cannot be
submitted by clients. Users see/cancel only their own reservations. Shared
availability reveals occupied times without identities, purposes, or notes.
Only administrators can create, edit, deactivate, or delete shared resources.
Members can browse resources and manage their own bookings. Resources with ongoing
or future confirmed bookings cannot be deactivated or put under maintenance.

Availability is a snapshot. Creation rechecks inside a transaction, locks the
resource row, and inserts under the `reservations_no_overlap` GiST exclusion
constraint. The constraint protects concurrent requests and direct database
writes. Database triggers coordinate booking and resource status changes.

## Reservation API

| Method | Endpoint | Behavior |
| --- | --- | --- |
| POST | `/api/reservations` | Create, HTTP 201 |
| GET | `/api/reservations` | Paginated personal bookings |
| GET | `/api/reservations/[id]` | Personal details |
| DELETE | `/api/reservations/[id]` | Cancel, retain history |
| GET | `/api/availability?date=YYYY-MM-DD` | Colombo day schedule |
| GET | `/api/availability?resourceId=UUID&startTime=ISO&endTime=ISO` | Check interval |

Creation accepts `resourceId`, `startTime`, `endTime`, `purpose` (2–120 characters),
and optional `notes` (up to 1,000). Times require explicit Z or offset. Listing
accepts `status` (all/upcoming/completed/CANCELLED), `page`, `pageSize` (1–100).
Use URLSearchParams to encode ISO offsets in queries.
Errors return `error`, `code`, and optional field feedback: 400 invalid inputs,
401 missing session, 403 cross-origin mutation, 404 missing/unowned booking,
409 booking conflict or invalid state, 415 wrong content type, 503 temporary
storage failures. Responses are private/no-store; raw database errors stay private.
See [resource management](docs/resource-management.md) for resource endpoints.

## Database integrity

Both application tables enable RLS and revoke direct Supabase Data API access
for anon/authenticated roles. Privileged Prisma access therefore requires the
application authentication/ownership checks. Reservation userId directly references
Supabase-managed `auth.users.id`. No duplicate password/profile table is needed.
Restrictive foreign keys retain history; deleting an Auth account with bookings
requires an explicit retention policy in a later feature.

SQL migrations include exclusion/check constraints, the Auth foreign key, and
triggers that Prisma cannot fully represent. Preserve them in future migrations.
Do not edit already-applied migrations.

## Design and checks

Semantic Tailwind tokens and the existing ws- workspace theme remain in use.
Cache Components, partial prefetching, and Tailwind Turbopack configuration remain.
No dependencies were added for reservation management.

Frontend integration includes shared loading skeletons, retryable workspace
errors, empty states with next actions, and dismissible success feedback after
resource and reservation mutations. Filter/date changes hide stale results while
loading; failed fetches do not show outdated records as current. Resource changes
invalidate dashboard, availability, and reservation views. The header booking
shortcut opens real upcoming reservations, and the landing footer links to login.

```sh
npm run lint
npm run typecheck
npm run build
npm test
npm run test:integration
npm run test:http
```

Run `npm run test:resources`, `npm run test:reservations`, or `npm run test:admin` to isolate a database
suite. `npm test` needs no database. Run `npm run db:check` first if integration
checks fail during setup; it verifies database and Auth connectivity without
printing credentials. Integration failures report a stage and error code.

The build fetches configured Google fonts when needed. Integration checks require
the configured database. Reservation checks borrow existing Auth IDs without
creating accounts, use isolated temporary resources/bookings, and clean up only
their generated IDs. They test ownership, cancellation, adjacency, availability,
concurrent service requests, maintenance/inactive resource protection, retained
cancelled history, and independent raw database writes. Resource CRUD runs inside
a rolled-back transaction, allowing up to ten seconds to acquire a connection
to the hosted database. Admin integration checks require an existing admin grant
and a second Auth account; they test role rejection, cross-owner management,
statistics, cancellation, and deletion with history protection. `test:http`
requires a completed build, starts its own temporary localhost server, checks
anonymous redirects/API rejection and origin protection, then stops the server.

Manual assessment checks (`npm run dev`, then sign in as an administrator for
resource management):

1. Create a temporary resource at `/resources/new`. Find it in the catalog, open
   its details, edit its name/capacity, and reload to verify persistence.
2. Deactivate it and verify its inactive status. Reactivate it through the edit
   form before booking; deactivation preserves the record and booking history.
3. Select a future free window in Availability and create a reservation. Reload
   its details and confirm the resource and times are retained.
4. Submit another booking for an overlapping window on that resource. Expect a
   conflict message; a booking starting exactly when the first ends is allowed.
   Attempting to deactivate the resource while it has a future booking should
   also be rejected.
5. Cancel the first reservation. Verify Cancelled history retains it and its slot
   is free, then book the released slot again. With a second account, verify the
   first account's reservation details cannot be viewed or cancelled.

Members must receive HTTP 403 when attempting resource mutations or any admin
API. Opening `/admin` as a member redirects to the member dashboard. Sign in as
an admin, open **Administration**, and verify all members' bookings are visible;
cancel another member's future booking and verify it is cancelled in that
member's history. Confirm only admins see inventory management actions.

The automated integration suites exercise services and database constraints.
The manual checklist covers the browser forms and feedback as well.

## GitHub Actions

[CI workflow](.github/workflows/ci.yml) runs on every push to `main`. It installs
locked dependencies with `npm ci` on Node.js 24, then runs lint, type-checking,
unit tests, the production build, and HTTP access checks. Any failed step marks the run as failed.
It uses build-only placeholder settings and requires no repository secrets.
Database integration tests are separate: they require a configured database
with migrations applied and at least one existing Supabase Auth user.

Commit and push the workflow together with the test scripts in `package.json`
and their test files. Open the repository's **Actions** tab and select **CI** to
view results. Once the workflow is on the default branch, **Run workflow** can
also trigger it manually. This workflow checks the project; deployment is not
configured.

## Administrator access

Admins sign in through the existing login page. With no explicit destination,
admin login opens `/admin`. The sidebar includes admin overview, resources, and
all reservations. The overview shows resources by status/category, availability
now, today's confirmed bookings, ongoing/upcoming bookings, and reservation
history counts. Refresh retrieves current statistics from PostgreSQL.

Apply migrations, register the intended account normally, then grant its role
from a trusted server terminal using the configured database connection:

```sh
npm run db:migrate
npm run admin:access -- grant buddhima@gmail.com
```

The requested account has been granted admin access in the configured database.
Its existing password remains unchanged. For another environment, run the command
after that account exists there. To revoke access:

```sh
npm run admin:access -- revoke buddhima@gmail.com
```

Roles live in the protected `public.admins` table, linked to `auth.users`. Signup
never grants a role; user-editable metadata and request fields cannot grant admin
access. No admin role-management endpoint is exposed. Pages and APIs independently
verify the session and grant; role changes take effect on the next request.

Admin resource management lives at `/admin/resources`. Create/edit uses the
existing validated resource API. Availability controls set ACTIVE, INACTIVE, or
MAINTENANCE; they cannot disable a resource with ongoing/future confirmed bookings.
Cancel those bookings first. Permanent deletion at `DELETE /api/admin/resources/[id]`
is allowed only without any reservation history; otherwise HTTP 409 preserves it.
The older `DELETE /api/resources/[id]` remains safe deactivation.

`/admin/reservations` supports search, status filters, pagination, owner names,
email addresses, and full booking details. Admins can cancel any upcoming or
ongoing booking via `DELETE /api/admin/reservations/[id]`; completed bookings remain
immutable and repeated cancellations preserve the first cancellation timestamp.
Ordinary reservation endpoints retain owner scoping, including for admins.
Admin responses use private/no-store headers and mutations require the same origin.
`GET /api/admin/statistics` exposes the overview counts to admins only.

`npm run dev` regenerates the Prisma client before starting Next.js. When models
are added during development, the singleton replaces an older cached client that
lacks the required model delegates. If a dev server still has stale generated
modules, stop it with Ctrl+C and restart `npm run dev`.

## Account settings

Open Settings in the workspace sidebar or visit `/settings`. Both members and
admins can edit their display name and change their own password. The page also
shows their sign-in email, persisted workspace role, membership date, timezone,
and a sign-out control. Email and role are displayed without editing controls.

`PATCH /api/settings/account` verifies the authenticated user and same origin.
Profile changes accept only the display name. Password changes require matching
new passwords of 8–128 characters and verify the current password against the
same account in a separate temporary session, which is revoked after the check.
Existing browser session cookies are not replaced by password verification.

To test: save a new name and reload; confirm it appears in the workspace header.
Try mismatching new passwords and an incorrect current password; both must be
rejected. With a test account, change the password, sign out, and sign back in
with the new password. While signed out, `/settings` redirects to login and the
settings API returns 401. Cross-origin updates return 403. Closing a tab keeps
the session; use Sign out to end this browser’s session.

`npm test` includes account validation, profile field restrictions, current
password verification, account matching, and provider error tests.
`npm run test:http` checks Settings redirects and API authentication/origin guards.

Sign-out redirects with a full page navigation after the server responds, clearing
the current tab’s cached authenticated view. A notification also redirects other
open workspace tabs to login; switching tabs without signing out keeps the session.
Restoring a workspace page from browser history reloads it to verify its cookies.
Logout requests have a 10-second server deadline and a 15-second browser timeout;
failures show an error and re-enable the button instead of staying on “Signing out…”.

To check multiple tabs, open the workspace twice, sign out in one tab, then return
to the other. Both should show login. Sign in again and switch tabs without clicking
Sign out; both should stay signed in. Disconnect the network and try signing out:
an error should appear and the button should allow another attempt.

## Landing page motion

The existing landing page uses GSAP for a line-by-line headline entrance, a drawn
underline, staggered section/card reveals, a reading-progress line, a workflow
connector reveal, and a subtle desktop perspective effect on the product preview. Its
layout, content, navigation, and calls to action are preserved. Styling refinements
are scoped to `.reserva-landing`, including typography, soft background lighting,
card depth, a contrasting middle feature card, navigation underlines, button shine,
and pointer-following card lighting on devices with a precise pointer.

Animations respect `prefers-reduced-motion`, and GSAP contexts are reverted on
unmount or when the media query changes; pointer listeners are also removed. The page renders visible content without
JavaScript. To review, open `/`, scroll through each section, check mobile widths,
and enable reduced motion in your browser’s rendering settings.
