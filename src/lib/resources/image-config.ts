export const MAX_RESOURCE_IMAGE_BYTES = 4 * 1024 * 1024;
export const RESOURCE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const RESOURCE_IMAGE_BUCKET = "resource-images";

export function resourceImageFileError(file: Pick<File, "size" | "type">): string | null {
  if (!RESOURCE_IMAGE_TYPES.some(type => type === file.type)) return "Choose a JPG, PNG, or WebP image.";
  if (!file.size) return "This image is empty. Choose another file.";
  if (file.size > MAX_RESOURCE_IMAGE_BYTES) return "Choose an image smaller than 4 MB.";
  return null;
}
