import { z } from "zod";

export const requestEmailChangeSchema = z.object({
  newEmail: z
    .string("Email address is required")
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
});

export type RequestEmailChangeFormData = z.infer<typeof requestEmailChangeSchema>;

