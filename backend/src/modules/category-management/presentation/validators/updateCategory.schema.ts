import { z } from "zod";

export const updateCategorySchema = z.object({
    id: z.string().uuid("Invalid category ID").optional(),

    categoryName: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name cannot exceed 100 characters")
        .regex(/^[A-Za-z\s]+$/, "Category name can only contain letters")
        .optional(),

    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
}).refine(
    (data) => Boolean(data.categoryName !== undefined || data.status !== undefined),
    {
        message: "At least one field (categoryName or status) must be provided for update",
    }
);
