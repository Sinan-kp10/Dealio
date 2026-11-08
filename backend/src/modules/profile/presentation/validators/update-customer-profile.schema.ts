import { z } from "zod";

export const UpdateCustomerProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(255, "Name cannot exceed 255 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters"),
});
