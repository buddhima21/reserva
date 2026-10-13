# Resource management

Phase 2 uses the existing Prisma singleton and Supabase PostgreSQL connection.
The shared workspace design, resource category controls, grid/list layouts, and
Room 4A URL are preserved. Cards/details now receive saved resource records.

## Local setup

```sh
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

The first resource migration creates `public.resources`, resource status, indexes,
and constraints without changing Supabase Auth tables. It has been applied to the
current project. The database had no public application tables before this migration.
For another database with existing application tables, inspect and baseline them
before applying the initial migration; never reset to force a migration through.

The seed imports the six original catalog resources. It uses stable IDs and unique
legacy slugs with empty upsert updates, preserving user edits and inactive states.
It creates no users or reservations. Prisma CLI TLS verification uses the existing
Supabase public certificate, just like the runtime adapter.

## Routes and behavior

- `/resources`: persisted catalog with search across name, description, and location.
  Category, operational status, capacity, and floor filters run in PostgreSQL.
  Results use stable ordering and pagination (12 per page).
- `/resources/new`: create a resource with optional image and floor metadata.
- `/resources/[id]`: resource details and a confirmation dialog for deactivation.
- `/resources/[id]/edit`: update details or reactivate an inactive resource.
- `/resources/executive-meeting-room-4a`: preserved alias to the seeded Room 4A record.

Status is ACTIVE, MAINTENANCE, or INACTIVE. It describes operational readiness, not
booking availability. Deactivation sets INACTIVE and never deletes the row. All
statuses remain visible under All Statuses and can be filtered. There is no hard
delete endpoint. Reservation scheduling, conflicts, and booking persistence remain
the next phase. Dashboard/availability/reservation screens still use sample data.

## API

| Method | Endpoint | Result |
| --- | --- | --- |
| GET | `/api/resources` | Paginated resource records and filter metadata |
| POST | `/api/resources` | Create resource, HTTP 201 |
| GET | `/api/resources/[id]` | One resource |
| PATCH | `/api/resources/[id]` | Update supplied fields only |
| DELETE | `/api/resources/[id]` | Safely deactivate, retaining the record |

Query parameters: `q`, `category`, `status`, `capacity` (all/small/medium/large),
`floor`, `page`, and `pageSize` (1–100). Search is case-insensitive. Capacity filters
cover 1–4, 5–10, and 11+ people; equipment with capacity zero is shown under Any
Capacity. Category counts and floor options describe the complete inventory.

Mutation fields: name, category, description, location, capacity, status, floor,
imageUrl. ID, slug, and timestamps cannot be supplied or edited. Slugs exist only
for seeded legacy URLs. Description, floor, and image URL may be cleared to null.
Images must use HTTPS and contain no URL credentials; image optimization remains
disabled, matching the original asset setup. The server does not fetch user image
URLs. Name/location, category/status, lengths, integer capacity, IDs, and pagination
are validated before database access.

Errors contain `error` and `code`, plus `fields` for input errors. Expected status
codes include 400 (invalid data/filter/ID), 401 (not signed in), 403 (cross-origin
mutation), 404 (missing resource), 409 (conflict), 415 (incorrect content type), and
503 (unavailable storage). Unexpected errors return a generic 500 response without
database details. Resource responses use private/no-store cache headers.

## Access model

Every resource API independently verifies Supabase Auth, including GET requests.
Any signed-in workspace member can currently manage shared inventory; no admin role
has been introduced. Passwords and user-editable metadata never grant elevated roles.
Mutations require a same-origin request. Database RLS is enabled and direct access
for anon/authenticated Data API roles is revoked. Server Prisma uses the configured
privileged database role, so application authentication checks remain essential.

## Validation

```sh
node --conditions=react-server --import tsx --test tests/auth.test.ts tests/resources.test.ts
node --conditions=react-server --import tsx tests/resources.integration.ts
npm run lint
npm run typecheck
npm run build
```

The integration script verifies create/read/update/deactivate/reactivate, combined
search/filter behavior, and missing-record errors in a transaction which is always
rolled back. No test resources remain after it passes. It requires the configured
database connection. It does not create Auth test accounts.

Manual check with your existing account: create a resource, reload its details,
edit it, search/filter for it, deactivate it, then reactivate it from Edit Resource.
Verify Cancel in the deactivation dialog changes nothing.
