import { z } from "zod";

export const registerEnterpriseSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(2, "Company name must contain at least 2 characters")
      .max(255, "Company name cannot exceed 255 characters"),

    contactPersonName: z
      .string()
      .trim()
      .min(2, "Contact person name must contain at least 2 characters")
      .max(255, "Contact person name cannot exceed 255 characters"),

    email: z
      .email("Please provide a valid work email address")
      .max(255, "Email cannot exceed 255 characters"),

    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/,"Enter a valid 10-digit phone number")
      .refine(
        (value) => !/^(\d)\1{9}$/.test(value),
        "Enter a valid phone number",
      ),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );
