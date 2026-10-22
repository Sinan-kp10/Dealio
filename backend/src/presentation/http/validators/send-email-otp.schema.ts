import { z } from "zod";

export const sendEmailOtpSchema = z.object({
  email: z
    .email("Please provide a valid email address")
    .max(255, "Email cannot exceed 255 characters")
    .transform((email) => email.trim().toLowerCase()),
});

export type SendEmailOtpInput = z.infer<typeof sendEmailOtpSchema>;