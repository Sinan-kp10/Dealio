import { z } from "zod";

export const registerCustomerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(255, "Name cannot exceed 255 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters"),

    email: z
      .email("Please provide a valid email address")
      .max(255, "Email cannot exceed 255 characters"),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
