import { z } from "zod";

export const UpdateEnterpriseBankRecordSchema = z.object({
  accountHolderName: z
    .string()
    .trim()
    .min(2, "Account holder name must contain at least 2 characters")
    .max(255, "Account holder name cannot exceed 255 characters")
    .optional(),
  bankAccountNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Bank account number must contain only numbers")
    .min(8, "Bank account number must be at least 8 digits")
    .max(20, "Bank account number cannot exceed 20 digits")
    .optional(),
  ifscCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Za-z0-9]+$/, "IFSC code must contain only letters and numbers")
    .min(4, "IFSC code must be at least 4 characters")
    .max(11, "IFSC code cannot exceed 11 characters")
    .optional(),
  accountType: z.enum(["CURRENT", "SAVINGS"], {
    message: "Valid account type (CURRENT or SAVINGS) is required",
  }).optional(),
  upiId: z.string().trim().max(255, "UPI ID cannot exceed 255 characters").optional(),
});
