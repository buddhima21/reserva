# Supabase PostgreSQL certificate

`supabase-ca.crt` is Supabase's public Root 2021 CA certificate, downloaded over
HTTPS from:

https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt

It contains no passwords or private keys and can be committed to Git. The
PostgreSQL adapter reads it to verify the pooler's TLS certificate and hostname.
Keep this directory available when deploying the application.

Supabase also provides the certificate under Database Settings → SSL Configuration
in the project dashboard. Replace it with the official updated certificate if
Supabase rotates its certificate authority.
