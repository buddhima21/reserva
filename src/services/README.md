# Services

`resources.ts` implements persisted resource listing, details, creation, updating,
and safe deactivation using the existing Prisma client. `reservations.ts` implements
owner-scoped creation, listing, details, cancellation, availability, and dashboard
summaries. Creation locks resource rows; PostgreSQL separately enforces overlap
exclusion. `src/app/api/**/route.ts` Route Handlers should
validate requests and call these services. Server Components can call server-side
services directly without making HTTP requests to their own application.

Connection helpers live in `src/lib/prisma.ts` and `src/lib/supabase/`.
Authentication Route Handlers use Supabase Auth; shared validation and session
helpers live in `src/lib/auth/`. Keep database access and secrets in server-only modules.
