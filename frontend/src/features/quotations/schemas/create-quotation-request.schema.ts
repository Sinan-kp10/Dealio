import { z } from "zod";

export const createQuotationFormSchema = z.object({
  productName: z
    .string({ message: "Product name is required" })
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(120, "Product name cannot exceed 120 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "Product name must not contain special characters"),

  categoryId: z.string({ message: "Please select a category" }).uuid("Please select a category"),

  subCategoryId: z.string({ message: "Please select a subcategory" }).uuid("Please select a subcategory"),

  quantity: z
    .string({ message: "Quantity is required" })
    .trim()
    .min(1, "Quantity is required")
    .regex(/^\d+$/, "Quantity must contain only numbers")
    .refine((val) => parseInt(val, 10) > 0, "Quantity must be greater than 0"),

  budget: z
    .string()
    .trim()
    .regex(/^[\d,]*$/, "Budget must contain only numbers")
    .refine((val) => {
      const clean = val.replace(/,/g, "");
      return clean === "" || parseInt(clean, 10) > 0;
    }, "Budget must be greater than 0")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .max(500, "Location cannot exceed 500 characters")
    .optional(),

  description: z
    .string({ message: "Description is required" })
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(2000, "Description cannot exceed 2000 characters"),
});

export type CreateQuotationFormData = z.infer<typeof createQuotationFormSchema>;
