BEGIN;

-- The policy checks the persisted admin grant without exposing the admins table.
CREATE FUNCTION public.can_upload_resource_images()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$ SELECT EXISTS (SELECT 1 FROM public.admins WHERE "userId" = (SELECT auth.uid())); $$;
REVOKE ALL ON FUNCTION public.can_upload_resource_images() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_upload_resource_images() TO authenticated;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('resource-images', 'resource-images', true, 4194304, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit, allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY reserva_admin_image_insert ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'resource-images'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  AND (SELECT public.can_upload_resource_images())
);
-- SELECT is needed by the Storage delete API to clean up a failed resource save.
CREATE POLICY reserva_admin_image_select ON storage.objects
FOR SELECT TO authenticated USING (
  bucket_id = 'resource-images'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  AND (SELECT public.can_upload_resource_images())
);
CREATE POLICY reserva_admin_image_delete ON storage.objects
FOR DELETE TO authenticated USING (
  bucket_id = 'resource-images'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  AND (SELECT public.can_upload_resource_images())
);

COMMIT;
