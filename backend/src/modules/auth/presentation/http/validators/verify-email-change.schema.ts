import { z } from "zod";

export const verifyEmailChangeSchema = z.object({
    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export type VerifyEmailChangeInput = z.infer<typeof verifyEmailChangeSchema>;

