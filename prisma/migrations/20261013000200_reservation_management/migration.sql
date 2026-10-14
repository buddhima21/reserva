BEGIN;

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA extensions;
SET LOCAL search_path = public, extensions;

CREATE TYPE public."ReservationStatus" AS ENUM ('CONFIRMED', 'CANCELLED');
CREATE TABLE public.reservations (
  id UUID NOT NULL PRIMARY KEY,
  "resourceId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "startTime" TIMESTAMPTZ(3) NOT NULL,
  "endTime" TIMESTAMPTZ(3) NOT NULL,
  status public."ReservationStatus" NOT NULL DEFAULT 'CONFIRMED',
  purpose TEXT NOT NULL,
  notes TEXT,
  "cancelledAt" TIMESTAMPTZ(3),
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMPTZ(3) NOT NULL,
  CONSTRAINT "reservations_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public.resources(id) ON DELETE RESTRICT,
  CONSTRAINT "reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON DELETE RESTRICT,
  CONSTRAINT reservations_valid_interval CHECK (isfinite("startTime") AND isfinite("endTime") AND "endTime" > "startTime"),
  CONSTRAINT reservations_nonblank_purpose CHECK (length(btrim(purpose)) BETWEEN 2 AND 120),
  CONSTRAINT reservations_cancelled_state CHECK ((status = 'CANCELLED') = ("cancelledAt" IS NOT NULL)),
  CONSTRAINT reservations_no_overlap EXCLUDE USING gist (
    "resourceId" WITH =,
    tstzrange("startTime", "endTime", '[)') WITH &&
  ) WHERE (status = 'CONFIRMED')
);
CREATE INDEX "reservations_userId_startTime_idx" ON public.reservations("userId", "startTime");
CREATE INDEX "reservations_resourceId_startTime_idx" ON public.reservations("resourceId", "startTime");
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.reservations FROM anon, authenticated;

-- Serialize booking creation and operational status changes on the resource row.
CREATE FUNCTION public.check_reservation_resource() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE resource_status public."ResourceStatus";
BEGIN
  IF NEW.status = 'CONFIRMED' THEN
    SELECT status INTO resource_status FROM public.resources WHERE id = NEW."resourceId" FOR UPDATE;
    IF resource_status IS DISTINCT FROM 'ACTIVE'::public."ResourceStatus" THEN
      RAISE EXCEPTION 'Resource is not active' USING ERRCODE = '23514', CONSTRAINT = 'reservations_resource_active';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER reservations_check_resource BEFORE INSERT OR UPDATE OF "resourceId", status ON public.reservations
FOR EACH ROW EXECUTE FUNCTION public.check_reservation_resource();

CREATE FUNCTION public.check_resource_reservations() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  IF NEW.status <> 'ACTIVE' AND EXISTS (
    SELECT 1 FROM public.reservations WHERE "resourceId" = NEW.id AND status = 'CONFIRMED' AND "endTime" > clock_timestamp()
  ) THEN
    RAISE EXCEPTION 'Resource has active reservations' USING ERRCODE = '23514', CONSTRAINT = 'resources_have_active_reservations';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER resources_check_reservations BEFORE UPDATE OF status ON public.resources
FOR EACH ROW EXECUTE FUNCTION public.check_resource_reservations();

COMMIT;
