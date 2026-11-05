import { z } from "zod";

export const createSubCategorySchema = z.object({
    categoryId: z.string().uuid("Invalid category ID"),

    subCategoryName: z
        .string()
        .trim()
        .min(2, "Subcategory name must be at least 2 characters")
        .max(100, "Subcategory name cannot exceed 100 characters"),

    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});
