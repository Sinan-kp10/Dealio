import { z } from "zod";

export const MAX_CHAT_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_CHAT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const sendMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .max(2000, "Message must not exceed 2000 characters")
    .optional(),
});

export const validateChatImage = (file: File): string | null => {
  if (!ALLOWED_CHAT_IMAGE_TYPES.includes(file.type)) {
    return "Only JPEG, PNG, or WebP images are allowed";
  }

  if (file.size > MAX_CHAT_IMAGE_SIZE) {
    return "Image size must not exceed 5 MB";
  }

  return null;
};
