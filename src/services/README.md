# Services

`resources.ts` implements persisted resource listing, details, creation, updating,
and safe deactivation using the existing Prisma client. Reservation and availability
business logic belong here when implemented. `src/app/api/**/route.ts` Route Handlers should
validate requests and call these services. Server Components can call server-side
services directly without making HTTP requests to their own application.

Connection helpers live in `src/lib/prisma.ts` and `src/lib/supabase/`.
Authentication Route Handlers use Supabase Auth; shared validation and session
helpers live in `src/lib/auth/`. Business services for persisted reservations are
not implemented yet. Keep database access and secrets in server-only modules.
