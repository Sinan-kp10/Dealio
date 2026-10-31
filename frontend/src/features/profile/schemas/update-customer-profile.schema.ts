import { z } from "zod";

export const updateCustomerProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters")
      .or(z.literal(""))
      .optional(),
    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
      .refine((val) => !/^(\d)\1{9}$/.test(val), "Enter a valid phone number")
      .or(z.literal(""))
      .optional(),
  })
  .refine(
    (data) =>
      Boolean(data.name && data.name.trim().length > 0) ||
      Boolean(data.phone && data.phone.trim().length > 0),
    {
      message: "At least one field (name or phone) must be provided",
      path: ["name"],
    }
  );
