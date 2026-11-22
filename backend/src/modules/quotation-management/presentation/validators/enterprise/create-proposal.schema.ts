import { z } from "zod";

export const createProposalSchema = z.object({
  itemName: z
    .string({ message: "Item name is required" })
    .trim()
    .min(2, "Item name must be at least 2 characters")
    .max(255, "Item name cannot exceed 255 characters"),

  description: z
    .string({ message: "Offer description is required" })
    .trim()
    .min(5, "Offer description must be at least 5 characters")
    .max(2000, "Offer description cannot exceed 2000 characters"),

  quantity: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number({ message: "Quantity is required" })
      .int("Quantity must be a whole number")
      .min(1, "Quantity must be at least 1")
      .max(10000000, "Quantity cannot exceed 10,000,000 units")
  ),

  unitPrice: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val),
    z
      .number({ message: "Unit price is required" })
      .positive("Unit price must be greater than 0")
      .max(100000000, "Unit price cannot exceed ₹100,000,000")
  ),

  deliveryTimeline: z
    .string({ message: "Delivery timeline is required" })
    .trim()
    .min(1, "Delivery timeline is required")
    .max(255, "Delivery timeline cannot exceed 255 characters"),

  warrantyCoverage: z
    .string({ message: "Warranty coverage is required" })
    .trim()
    .min(1, "Warranty coverage is required")
    .max(255, "Warranty coverage cannot exceed 255 characters"),

  replacementPolicy: z
    .string({ message: "Replacement policy is required" })
    .trim()
    .min(1, "Replacement policy is required")
    .max(255, "Replacement policy cannot exceed 255 characters"),

  additionalNotes: z
    .string()
    .trim()
    .max(1000, "Additional notes cannot exceed 1000 characters")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
});

export type CreateProposalInput = z.infer<typeof createProposalSchema>;
