
import { z } from "zod";

export const registerCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters")
    .max(255, "Name cannot exceed 255 characters"),

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

  phone: z
    .string()
    .trim()
    .max(255, "Phone number is too long")
    .optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export type RegisterCustomerInput = z.infer<
  typeof registerCustomerSchema
>;
