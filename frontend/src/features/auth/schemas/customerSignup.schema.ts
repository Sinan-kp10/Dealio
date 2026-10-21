import { z } from "zod";

export const customerSignupSchema = z.object({

    name: z.string().trim().min(3, "Name must contain at least 3 characters"),

    email: z.email("Enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must contain at least 6 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });