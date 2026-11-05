import { z } from "zod";

export const verifyEmailChangeSchema = z.object({
  otp: z
    .string("Please enter the 6-digit verification code")
    .trim()
    .min(1, "Please enter the 6-digit verification code")
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

export type VerifyEmailChangeFormData = z.infer<typeof verifyEmailChangeSchema>;

