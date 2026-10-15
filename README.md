# RESERVA

A resource reservation management system built for the PrimeWave Lab Software Engineering Internship Technical Assessment.

RESERVA replaces manual booking records with a shared resource catalog, a daily availability schedule, and persistent reservations. PostgreSQL prevents overlapping confirmed bookings, including simultaneous requests for the same resource.

## Features

- **Members:** sign up, sign in, browse and filter resources, check availability, create reservations, view personal booking history, and cancel upcoming or ongoing bookings.
- **Administrators:** create and edit resources, upload resource images, manage operational status, view platform statistics and all members' bookings, and cancel reservations across the workspace.
- **Account settings:** update a display name, change a password using the current password, and sign out across open workspace tabs.
- **Usability:** loading and empty states, validation feedback, retryable errors, pagination, and booking times displayed in Asia/Colombo.

## Technology stack

| Area | Technology |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, GSAP for landing-page motion |
| Database | PostgreSQL hosted on Supabase |
| Database access | Prisma 7 with the PostgreSQL driver adapter |
| Authentication | Supabase Auth with server-managed session cookies |
| Image storage | Supabase Storage; Sharp validates and optimizes uploads |
| Version control and CI | Git, GitHub, GitHub Actions |

## Run locally

### Prerequisites

- Node.js 24 and npm, matching the CI runtime.
- Git.
- A Supabase project with PostgreSQL, Email authentication, and Storage. The application runs locally and connects to this project; a standalone PostgreSQL instance alone does not provide its Auth and Storage dependencies.

### 1. Clone and configure

```sh
git clone https://github.com/buddhima21/reserva.git
cd reserva
```

Copy `.env.example` to `.env` and replace its placeholders:

```dotenv
DATABASE_URL="postgresql://USER:URL_ENCODED_PASSWORD@SESSION_POOLER_HOST:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="YOUR_PUBLISHABLE_KEY"
```

Use the Supabase **session pooler** connection on port 5432 and URL-encode special characters in the database password. Keep the actual connection string in `.env`; it is ignored by Git. The publishable key is the client-safe project key. A service-role key is not required.

In the Supabase dashboard:

1. Enable the Email authentication provider.
2. Set the local Site URL to `http://localhost:3000`.
3. Turn **Confirm email OFF** so signup returns a session immediately. The application checks this setting before creating an account.

See [authentication configuration](docs/authentication.md) for details.

### 2. Install and prepare the database

```sh
npm ci
npm run db:migrate
npm run db:seed
npm run db:check
```

Installation generates the Prisma client. Migrations create application tables, database constraints, administrator grants, and the `resource-images` storage bucket and policies. The idempotent seed adds six resources while preserving existing edits; it does not create accounts or bookings.

Keep `certs/supabase-ca.crt` available: Prisma and the PostgreSQL adapter use this public CA certificate to verify TLS. See [certificate details](certs/README.md).

### 3. Start the application

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for a member account or use the assessment administrator account below.

For a production build running locally:

```sh
npm run build
npm start
```

The build may require network access to download its configured Google fonts.

## Administrator access

The assessment administrator login supplied for review is:

| Field | Value |
| --- | --- |
| Sign-in page | `/login` |
| Email | `buddhima@gmail.com` |
| Password | `12345678` |
| Administrator workspace | `/admin` |

With no explicit destination, administrator sign-in opens `/admin`. Administrators can manage inventory at `/admin/resources` and all members' reservations at `/admin/reservations`.

These credentials apply to the configured assessment database. For a fresh Supabase project, first register this account through `/signup` with the supplied credentials, then grant its administrator role from a trusted terminal connected to that project:

```sh
npm run admin:access -- grant buddhima@gmail.com
```

To revoke the grant:

```sh
npm run admin:access -- revoke buddhima@gmail.com
```

The command changes only the administrator grant; it does not create an account or set its password. Roles are stored in `public.admins`, linked to Supabase Auth users. Signup and editable profile metadata cannot grant administrator access.

## Booking rules and engineering decisions

- Start times must be in the future; end times must be later than start times. Overnight and multi-day bookings are supported.
- Only `ACTIVE` resources can be booked. `MAINTENANCE` and `INACTIVE` resources remain in the catalog but cannot accept reservations.
- Only `CONFIRMED` reservations block time. Intervals use an inclusive start and exclusive end, allowing one booking to start exactly when another ends.
- Creation locks the resource row and rechecks availability in a transaction. A PostgreSQL GiST exclusion constraint separately rejects overlapping bookings, including direct database writes.
- Availability is a snapshot refreshed by date changes or the Refresh button. Final confirmation always checks the database again.
- Members can access and cancel only their own bookings. Cancellation releases the slot and retains history; completed bookings cannot be cancelled.
- Resources with ongoing or future confirmed bookings cannot be made inactive or put under maintenance. Permanent deletion is allowed only when a resource has no reservation history.
- PostgreSQL stores absolute instants as `timestamptz`; input and display use `Asia/Colombo`.
- Supabase owns identities and passwords. Server-side session checks determine ownership, and administrator access is checked independently on protected pages and API handlers.
- Shared availability reveals occupied time ranges without exposing booking owners, purposes, or notes. Application tables use RLS and deny direct access through the public Supabase Data API; Prisma services enforce application authorization.
- Resource uploads accept JPG, PNG, or WebP up to 4 MB and 25 megapixels, validate the decoded image, and save an optimized WebP to public resource-image storage.

## Database design

The current database has three application entities and references Supabase's managed user entity. The foreign keys to `auth.users` are defined in SQL migrations; Prisma does not manage the Auth schema.

```mermaid
erDiagram
    AUTH_USERS ||--o| ADMINS : "may have admin grant"
    AUTH_USERS ||--o{ RESERVATIONS : "creates"
    RESOURCES ||--o{ RESERVATIONS : "receives"

    AUTH_USERS {
        uuid id PK
        string email
        jsonb raw_user_meta_data
    }
    ADMINS {
        uuid userId PK, FK
        timestamptz createdAt
    }
    RESOURCES {
        uuid id PK
        string name
        string description
        string category
        string location
        int capacity
        ResourceStatus status
        string floor
        string imageUrl
        string slug UK
        timestamptz createdAt
        timestamptz updatedAt
    }
    RESERVATIONS {
        uuid id PK
        uuid resourceId FK
        uuid userId FK
        timestamptz startTime
        timestamptz endTime
        ReservationStatus status
        string purpose
        string notes
        timestamptz cancelledAt
        timestamptz createdAt
        timestamptz updatedAt
    }
```

`ResourceStatus` is `ACTIVE`, `MAINTENANCE`, or `INACTIVE`. `ReservationStatus` is `CONFIRMED` or `CANCELLED`; upcoming, ongoing, and completed are derived from reservation times. Nullable metadata fields and additional Supabase-managed user fields are documented in the [Prisma schema](prisma/schema.prisma) and [SQL migrations](prisma/migrations).

Reservation foreign keys restrict deletion to preserve history. Administrator grants are removed when their Auth user is deleted. SQL migrations also contain check constraints, overlap exclusion, and triggers that Prisma's schema cannot fully represent.

## Project structure

```text
src/app/          Pages, layouts, and API Route Handlers
src/components/   Forms, workspace views, and shared UI
src/lib/          Sessions, validation, timezone helpers, and database configuration
src/services/     Resource, reservation, account, and administrator business logic
src/types/        Shared application types
prisma/           Schema, SQL migrations, and resource seed data
scripts/          Database checks, seeding, and administrator provisioning
tests/            Unit, database integration, and HTTP access checks
docs/             Authentication and resource API documentation
certs/            Public CA certificate used for PostgreSQL TLS
```

Server Components load data through server-side services. Client Components handle forms and interactions, and Route Handlers validate and authorize requests before calling services. See the [service architecture](src/services/README.md) and [resource API documentation](docs/resource-management.md).

Generated Prisma files, dependencies, build output, local environment files, and test artifacts are excluded from Git. The Prisma client is regenerated by install, development, build, and typecheck commands.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:http
```

Unit tests require no database. HTTP checks require the production build and start and stop their own temporary server to check redirects, authentication, same-origin protection, and sign-out.

To run database integration checks against a configured project:

```sh
npm run db:check
npm run test:integration
```

Resource checks run in a rolled-back transaction. Reservation and administrator checks create temporary fixtures and remove their generated records. Reservation checks require an existing Auth user; administrator checks require an existing administrator and a second Auth user. These suites cover ownership, cancellation, adjacency, availability, concurrent booking attempts, database constraints, administrator permissions, and history protection.

The [GitHub Actions workflow](.github/workflows/ci.yml) runs lint, typecheck, unit tests, a production build, and HTTP access checks on pushes to `main` or manual dispatch. It uses placeholder environment settings and does not run database integration checks or deploy the application.

### Suggested review walkthrough

1. Sign in as the administrator and create a temporary resource. Edit it, reload, and confirm persistence.
2. Sign up as a member, open Availability, and reserve a future free window.
3. Attempt an overlapping booking and verify rejection. Verify an adjacent booking is allowed.
4. Cancel a booking, confirm its history remains, and reserve the released slot again.
5. Use another member account to verify ownership protection. Return as administrator to review all bookings and cancel a member's upcoming reservation.
6. Check small-screen layouts, validation feedback, empty states, and sign-out across two open tabs.

## Assessment submission materials

| Deliverable | Location / status |
| --- | --- |
| Complete application source and setup instructions | [GitHub repository](https://github.com/buddhima21/reserva) and this README |
| Entity relationship diagram | [Shareable database-design section](https://github.com/buddhima21/reserva#database-design); available after this README is pushed |
| 3-5 minute demonstration video | Recording link still to be added before submission |

The demonstration should explain the resource-coordination problem, show the booking/conflict/cancellation flow, and describe the authorization, database, and concurrency decisions. Submit accessible repository, video, and ER diagram links through the official assessment form.
