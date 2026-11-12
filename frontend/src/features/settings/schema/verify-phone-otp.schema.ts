import { z } from "zod";

export const verifyPhoneOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, "Please enter the 6-digit verification code")
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

export type VerifyPhoneOtpFormData = z.infer<typeof verifyPhoneOtpSchema>;

