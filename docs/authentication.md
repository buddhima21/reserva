# RESERVA authentication

Login (`/login`), signup (`/signup`), and local-session sign-out use Supabase Auth
through Next.js Route Handlers in `src/app/api/auth/`. The form sends credentials
over the same origin; handlers validate input and reject cross-origin requests.
Credentials and session tokens are never returned in JSON or logged.

The shared workspace layout verifies the user server-side before rendering its shell.
Proxy refreshes cookies, performs early login redirects, and preserves the requested
workspace URL. Future reservation/resource API handlers must independently check
authentication and ownership; layout protection alone does not protect APIs.

Names are stored in Supabase Auth's `full_name` user metadata for presentation only.
They never confer permissions. No profile/reservation schema migration is applied.
Reservation screens still contain sample data. There are no new dependencies.

## Supabase dashboard configuration

1. Enable the Email provider in Authentication → Sign In / Providers.
2. Under Authentication → URL Configuration, set Site URL to
   `http://localhost:3000` for local development.
3. In Authentication → Sign In / Providers → Email, turn **Confirm email OFF**
   and save. New signups then receive a session immediately and open the workspace.
   This project intentionally does not verify ownership of signup email addresses.
4. Remove previously added `/auth/callback` redirect entries if they are unused by
   other features. Confirmation routes and the Check your email screen were removed.
   No SMTP configuration or email template is required for this signup flow.
5. Existing accounts that were created while confirmation was enabled may still
   be unconfirmed. Update those accounts through Supabase's administrative tools;
   do not delete real accounts or expose a service-role key to the browser.

Before creating an account, the signup handler reads Supabase's public settings
endpoint without caching. If automatic confirmation is not enabled, signup returns
a configuration error before calling signUp, avoiding confirmation emails and
unconfirmed account creation. If settings cannot be checked, signup fails without
creating a user. A successful signup requires a returned session and redirects to
the requested workspace page. Password confirmation remains as input validation;
it does not send any email.

## Verification

Run `npm run lint`, `npm run typecheck`, and `npm run build`.
Run the authentication boundary tests with:

```sh
node --conditions=react-server --import tsx --test tests/auth.test.ts
```

Manual end-to-end check: disable Confirm email, sign up, verify immediate workspace
access, sign out, and sign back in. Confirm an anonymous workspace visit redirects to
login and that invalid credentials display an error. No test accounts or emails
are automatically created in the connected live Supabase project.

References:
- https://supabase.com/docs/guides/auth/passwords
- https://supabase.com/docs/guides/auth/general-configuration
