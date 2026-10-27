import { z } from "zod";

export const suspendAccountSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(1, "Suspension reason is required.")
    .max(500, "Suspension reason cannot exceed 500 characters."),
});