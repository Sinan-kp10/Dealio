import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must contain exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type OtpFormData = z.infer<typeof otpSchema>;