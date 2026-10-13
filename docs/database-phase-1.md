# Phase 1: database inspection and proposed schema

This is a proposal, not an applied migration. Inspection performed on October 13,
2026. No application code, database records, or Supabase-managed tables were changed.

## What exists

- `prisma/schema.prisma` defines only Resource: UUID ID, name, optional description,
  category, location, capacity, and timestamps. Resource status is missing.
- Read-only inspection of the configured database found no base tables, columns,
  or constraints in `public`. `auth.users` exists and has zero users. There is no
  application migration history in the repository.
- The existing server-only `getPrisma()` singleton, PostgreSQL adapter, environment
  loader, and verified TLS configuration already provide the required connection.
  Keep them. Supabase clients remain responsible for Auth; Prisma handles application
  data. No additional database client or dependencies are required.
- Route entry points and shared layouts are reusable. The resource catalog/details,
  dashboard, and availability timeline contain hardcoded sample records. Reservation
  forms use local state and `booking-preview.ts`; confirmation and draft actions do
  not persist. The reservations index is still a placeholder. There are no API Route
  Handlers or business services yet. Session refresh exists, but authorization does not.
- The existing preview types include React nodes and should remain presentation
  types; they are not database entities.

## Minimal proposed models

Keep every existing Resource field and its table/column naming. Add its status and
reservation relation. Add two application tables: profiles and reservations.

Supabase Auth owns passwords, email identities, and sessions. A profile ID is the
same UUID as `auth.users.id`, without an independently generated default. A custom
migration adds the foreign key to that primary key; Prisma should not take ownership
of Supabase's `auth` schema.

```prisma
enum ResourceStatus {
  ACTIVE
  MAINTENANCE
  INACTIVE
}

enum ReservationStatus {
  DRAFT
  CONFIRMED
  CANCELLED
}

model Profile {
  id           String        @id @db.Uuid
  displayName  String?
  createdAt    DateTime      @default(now()) @db.Timestamptz(3)
  updatedAt    DateTime      @updatedAt @db.Timestamptz(3)
  reservations Reservation[]

  @@map("profiles")
}

model Resource {
  id           String         @id @default(uuid()) @db.Uuid
  name         String
  description  String?
  category     String
  location     String
  capacity     Int            @default(0)
  status       ResourceStatus @default(ACTIVE)
  createdAt    DateTime       @default(now()) @db.Timestamptz(3)
  updatedAt    DateTime       @updatedAt @db.Timestamptz(3)
  reservations Reservation[]

  @@map("resources")
}

model Reservation {
  id           String            @id @default(uuid()) @db.Uuid
  resourceId   String            @db.Uuid
  userId       String            @db.Uuid
  startTime    DateTime          @db.Timestamptz(3)
  endTime      DateTime          @db.Timestamptz(3)
  status       ReservationStatus @default(CONFIRMED)
  purpose      String
  notes        String?
  createdAt    DateTime          @default(now()) @db.Timestamptz(3)
  updatedAt    DateTime          @updatedAt @db.Timestamptz(3)
  resource     Resource          @relation(fields: [resourceId], references: [id], onDelete: Restrict)
  user         Profile           @relation(fields: [userId], references: [id], onDelete: Restrict)

  @@index([resourceId, startTime])
  @@index([userId, startTime])
  @@map("reservations")
}
```

`notes` retains the existing form's attendees/special requirements text. DRAFT
supports its Save Draft button; this minimal model supports complete drafts with
a resource, purpose, and valid interval. Supporting incomplete drafts would require
nullable fields and status-dependent validation and is outside this proposal.

Resource status represents whether it can be booked operationally. Available Now
and Reserved Until must be calculated from confirmed reservations and the current
time, not stored as a boolean or changed whenever a booking starts. In Progress,
Upcoming, and Completed are display states derived from confirmed reservation times.
Drafts and cancelled reservations never block availability.

Store absolute instants in PostgreSQL `timestamptz`; interpret date/time form input
and display it in `Asia/Colombo`. Keep category as a string and standardize initial
values to the existing filter keys: meeting, workspace, equipment, and event.

## Integrity rules required in the migration

Prisma relations create resource/profile foreign keys. Custom SQL must also add:

- `profiles.id` referencing `auth.users.id`, with restricted deletion to preserve
  profiles and booking history. Account deletion needs an explicit later policy.
- Resource capacity greater than or equal to zero (zero remains valid for equipment).
- Reservation end time strictly after start time and nonblank purpose.
- A PostgreSQL exclusion constraint preventing overlapping CONFIRMED reservations
  for the same resource, including concurrent requests. A client-side precheck alone
  cannot enforce this.

Example additions after Prisma's generated CREATE statements:

```sql
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_auth_user_fkey
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE RESTRICT;

ALTER TABLE public.resources
  ADD CONSTRAINT resources_capacity_nonnegative CHECK (capacity >= 0);

ALTER TABLE public.reservations
  ADD CONSTRAINT reservations_valid_interval CHECK ("endTime" > "startTime"),
  ADD CONSTRAINT reservations_nonblank_purpose CHECK (length(btrim(purpose)) > 0);

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA extensions;
-- Resolve the extension's UUID operator class during constraint creation.
SET LOCAL search_path = public, extensions;

ALTER TABLE public.reservations
  ADD CONSTRAINT reservations_no_overlap
  EXCLUDE USING gist (
    "resourceId" WITH =,
    tstzrange("startTime", "endTime", '[)') WITH &&
  ) WHERE (status = 'CONFIRMED');
```

Run this SQL inside the migration transaction so `SET LOCAL` takes effect. Inspect
the extension's existing installation schema first and adjust the search path if
necessary. `[)` allows one booking to begin exactly when another ends. Verify the
constraint for inserts, time/resource changes, and draft-to-confirmed transitions.
Document custom constraints because Prisma's schema language does not represent them.

Enable RLS on application tables when creating them, leaving browser writes denied
until explicit policies are implemented. Prisma requests still need authenticated
user/ownership checks: privileged database connections can bypass RLS. The backend
must take userId from the verified session, never from submitted form data. Profile
creation/synchronization belongs to the authentication implementation, before bookings
are accepted. Operational status checks also belong in the booking transaction.

## Preserve data and existing UI

1. Reinspect the target before applying a migration. Today's empty `public` schema
   does not guarantee another environment is empty. Back up any existing records.
2. On this inspected target, create the three tables additively. On a populated
   environment, baseline existing tables and add/backfill fields instead of resetting
   or recreating them. Report invalid intervals or conflicts before adding constraints;
   never silently delete records to make a migration pass.
3. Use a reviewed Prisma migration with custom SQL. Do not use `migrate reset` or
   `db push --accept-data-loss`, and do not migrate Supabase-managed auth/storage tables.
4. Seed real resource records later with stable UUIDs and idempotent operations. Do
   not create fake authenticated users or assign mock bookings to a real account.
5. Existing mock IDs (`resource-1`, `studio-hub`, etc.) are not UUIDs. Replace their
   data references consistently when connecting the UI; keep the current Room 4A URL
   as a stable alias. No component or route redesign is needed.
6. Sample names/capacities differ between screens (for example Room 4A is 12 seats
   in a dashboard block and 16 elsewhere). Use one database-backed resource source
   for all screens. Floor filters, images, and hardware specifications are additional
   presentation metadata; add optional fields only when implementing their persistence.
7. The current 08:00–18:00 hours, four-hour limit, grace period, integrations, and
   cancellation policy are mock assumptions, not established business requirements.
   Confirm their intended behavior before enforcing them. Team membership and calendar
   integrations do not require new tables in this minimal reservation schema.

## References

- [Supabase user data and profile references](https://supabase.com/docs/guides/auth/managing-user-data)
- [Prisma custom migration features](https://docs.prisma.io/docs/orm/prisma-migrate/workflows/unsupported-database-features)
- [PostgreSQL range exclusion constraints](https://www.postgresql.org/docs/current/rangetypes.html)
