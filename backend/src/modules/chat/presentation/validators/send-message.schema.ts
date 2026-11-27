import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .max(2000, "Message must not exceed 2000 characters")
    .optional(),
});
