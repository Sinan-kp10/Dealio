import { z } from "zod";

export const UpdateEnterpriseDetailsSchema = z
  .object({
    enterpriseName: z
      .string()
      .trim()
      .min(2, "Enterprise name must contain at least 2 characters")
      .max(255, "Enterprise name cannot exceed 255 characters")
      .optional(),

    contactPerson: z
      .string()
      .trim()
      .min(2, "Contact person name must contain at least 2 characters")
      .max(255, "Contact person name cannot exceed 255 characters")
      .regex(/^[a-zA-Z\s]+$/, "Contact person name cannot contain numbers or special characters")
      .optional(),

    categoryId: z
      .string()
      .uuid("Invalid category ID")
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional()
      .nullable(),

    subcategoryIds: z
      .array(z.string().uuid("Invalid subcategory ID"))
      .optional(),
  })
  .refine(
    (data) =>
      data.enterpriseName !== undefined ||
      data.contactPerson !== undefined ||
      data.categoryId !== undefined ||
      data.description !== undefined ||
      data.subcategoryIds !== undefined,
    {
      message: "At least one field must be provided to update",
    }
  );

