import { z } from "zod";

export const requestPhoneOtpSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .refine((value) => !/^(\d)\1{9}$/.test(value), "Enter a valid phone number"),
});

export type RequestPhoneOtpInput = z.infer<typeof requestPhoneOtpSchema>;

