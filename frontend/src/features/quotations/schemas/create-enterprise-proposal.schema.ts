import { z } from "zod";

export const createEnterpriseProposalSchema = z.object({
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

  quantity: z
    .number({ message: "Quantity is required" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(10000000, "Quantity cannot exceed 10,000,000 units"),

  unitPrice: z
    .string({ message: "Unit price is required" })
    .trim()
    .min(1, "Unit price is required")
    .refine((val) => {
      const num = parseFloat(val.replace(/,/g, ""));
      return !isNaN(num) && num > 0;
    }, "Unit price must be greater than 0")
    .refine((val) => {
      const num = parseFloat(val.replace(/,/g, ""));
      return !isNaN(num) && num <= 100000000;
    }, "Unit price cannot exceed ₹100,000,000"),

  deliveryTimeline: z
    .string({ message: "Please select or specify a delivery timeline" })
    .trim()
    .min(1, "Please select or specify a delivery timeline")
    .max(255, "Delivery timeline cannot exceed 255 characters"),

  warrantyCoverage: z
    .string({ message: "Please select or specify warranty coverage" })
    .trim()
    .min(1, "Please select or specify warranty coverage")
    .max(255, "Warranty coverage cannot exceed 255 characters"),

  replacementPolicy: z
    .string({ message: "Please select or specify a replacement policy" })
    .trim()
    .min(1, "Please select or specify a replacement policy")
    .max(255, "Replacement policy cannot exceed 255 characters"),

  additionalNotes: z
    .string()
    .trim()
    .max(1000, "Additional notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateEnterpriseProposalFormData = z.infer<typeof createEnterpriseProposalSchema>;
