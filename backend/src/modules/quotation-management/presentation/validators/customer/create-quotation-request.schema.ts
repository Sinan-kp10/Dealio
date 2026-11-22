import { z } from "zod";

export const createQuotationRequestSchema = z.object({
    productName: z
        .string({ message: "Product name is required" })
        .trim()
        .min(2, "Product name must be at least 2 characters")
        .max(120, "Product name cannot exceed 120 characters")
        .regex(/^[a-zA-Z0-9\s]+$/, "Product name must not contain special characters"),

    categoryId: z.string({ message: "Category is required" }).uuid("Invalid category ID"),

    subCategoryId: z.string({ message: "Sub category is required" }).uuid("Invalid subcategory ID"),

    quantity: z
        .number({ message: "Quantity must be a number" })
        .int("Quantity must be a whole number")
        .positive("Quantity must be greater than 0"),

    budget: z
        .number({ message: "Budget must be a number" })
        .int("Budget must be a whole number")
        .positive("Budget must be greater than 0")
        .optional()
        .nullable(),

    location: z
        .string()
        .trim()
        .max(500, "Location cannot exceed 500 characters")
        .optional()
        .nullable(),

    description: z
        .string({ message: "Description is required" })
        .trim()
        .min(5, "Description must be at least 5 characters")
        .max(2000, "Description cannot exceed 2000 characters"),
});

export type CreateQuotationRequestInput = z.infer<typeof createQuotationRequestSchema>;
