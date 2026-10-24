import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email address."),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter"),
});