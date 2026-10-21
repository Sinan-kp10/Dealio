import { z } from "zod";

export const loginSchema = z.object({

    email: z.email("Enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must contain at least 6 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
})
