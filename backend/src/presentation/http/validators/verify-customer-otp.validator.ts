import { z } from "zod";

export const verifyCustomerOtpSchema = z.object({
  email: z
    .email("Please provide a valid email address")
    .max(255, "Email cannot exceed 255 characters")
    .transform((email) => email.trim().toLowerCase()),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export type VerifyCustomerOtpInput = z.infer<typeof verifyCustomerOtpSchema>;