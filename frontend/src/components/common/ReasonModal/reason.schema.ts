import { z } from "zod";

export const reasonSchema = z
    .string()
    .trim()
    .min(1, "Reason is required.")
    .min(10, "Reason must be at least 10 characters.")
    .max(500, "Reason cannot exceed 500 characters.")
    .refine((val) => /[a-zA-Z0-9]/.test(val), {
        message: "Reason cannot contain only symbols.",
    })
    .refine((val) => /[a-zA-Z]/.test(val), {
        message: "Reason must contain at least one letter.",
    });

export type ReasonSchema = z.infer<typeof reasonSchema>;
