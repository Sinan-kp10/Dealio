import { z } from "zod";

export const enterpriseSignupSchema = z
  .object({
    enterpriseName: z
      .string()
      .trim()
      .min(2, "Enterprise name must contain at least 2 characters")
      .regex(/[a-zA-Z0-9]/, "Enterprise name cannot contain only special characters"),

    contactPersonName: z
      .string()
      .trim()
      .min(2, "Contact person name must contain at least 2 characters")
      .regex(/^[a-zA-Z\s]+$/, "Contact person name cannot contain numbers or special characters"),

    email: z
      .string()
      .trim()
      .pipe(z.email("Enter a valid work email address")),

    phone: z
      .string()
      .trim()
      .refine(
        (value) => /^[6-9]\d{9}$/.test(value) && !/^(\d)\1{9}$/.test(value),
        "Enter a valid 10-digit phone number"
      ),

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
