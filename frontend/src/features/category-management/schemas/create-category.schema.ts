import { z } from "zod";

export const createCategorySchema = z.object({
    categoryName: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name cannot exceed 100 characters"),

    status: z.enum(["ACTIVE", "INACTIVE"]),
});
