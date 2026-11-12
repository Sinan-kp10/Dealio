import { z } from "zod";

export const requestPhoneOtpSchema = z.object({
  phone: z
    .string()
    .trim()
    .refine(
      (value) => /^[6-9]\d{9}$/.test(value) && !/^(\d)\1{9}$/.test(value),
      "Enter a valid 10-digit phone number"
    ),
});

export type RequestPhoneOtpFormData = z.infer<typeof requestPhoneOtpSchema>;

