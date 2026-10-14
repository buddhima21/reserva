BEGIN;

CREATE TYPE "public"."ResourceStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'INACTIVE');

CREATE TABLE "public"."resources" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "category" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "capacity" INTEGER NOT NULL DEFAULT 0,
  "status" "public"."ResourceStatus" NOT NULL DEFAULT 'ACTIVE',
  "floor" TEXT,
  "imageUrl" TEXT,
  "slug" TEXT,
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMPTZ(3) NOT NULL,
  CONSTRAINT "resources_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "resources_capacity_nonnegative" CHECK ("capacity" >= 0),
  CONSTRAINT "resources_name_not_blank" CHECK (length(btrim("name")) > 0),
  CONSTRAINT "resources_location_not_blank" CHECK (length(btrim("location")) > 0),
  CONSTRAINT "resources_category_valid" CHECK ("category" IN ('meeting', 'workspace', 'equipment', 'event'))
);

CREATE UNIQUE INDEX "resources_slug_key" ON "public"."resources"("slug");
CREATE INDEX "resources_status_category_idx" ON "public"."resources"("status", "category");

-- All application access is through authenticated server handlers using Prisma.
-- The publishable key must not grant direct browser access to these records.
ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "public"."resources" FROM anon, authenticated;

COMMIT;
