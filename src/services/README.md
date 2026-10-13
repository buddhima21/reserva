# Services

Place resource, reservation, and availability business logic here when those
features are implemented. Future `src/app/api/**/route.ts` Route Handlers should
validate requests and call these services. Server Components can call server-side
services directly without making HTTP requests to their own application.

No database clients, authentication, or services are implemented yet. Keep database
access and secrets in server-only modules when Prisma and Supabase are introduced.
