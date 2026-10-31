import { z } from "zod";

export const UpdateCustomerProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(255, "Name cannot exceed 255 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters")
      .optional()
      .nullable(),

    phone: z
      .union([
        z
          .string()
          .trim()
          .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
          .refine(
            (value) => !/^(\d)\1{9}$/.test(value),
            "Enter a valid phone number"
          ),
        z.literal(""),
        z.null(),
      ])
      .optional(),
  })
  .refine(
    (data) => data.name !== undefined || data.phone !== undefined,
    {
      message: "At least one field (name or phone) must be provided to update",
    }
  );
