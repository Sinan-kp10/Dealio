import { z } from "zod";

export const CreateEnterpriseBankRecordSchema = z.object({
  accountHolderName: z
    .string({ message: "Account holder name is required" })
    .trim()
    .min(2, "Account holder name must contain at least 2 characters")
    .max(255, "Account holder name cannot exceed 255 characters"),
  bankAccountNumber: z
    .string({ message: "Bank account number is required" })
    .trim()
    .regex(/^\d+$/, "Bank account number must contain only numbers")
    .min(8, "Bank account number must be at least 8 digits")
    .max(20, "Bank account number cannot exceed 20 digits"),
  ifscCode: z
    .string({ message: "IFSC code is required" })
    .trim()
    .toUpperCase()
    .regex(/^[A-Za-z0-9]+$/, "IFSC code must contain only letters and numbers")
    .min(4, "IFSC code is required")
    .max(11, "IFSC code cannot exceed 11 characters"),
  accountType: z.enum(["CURRENT", "SAVINGS"], {
    message: "Valid account type (CURRENT or SAVINGS) is required",
  }),
  upiId: z.string().trim().max(255, "UPI ID cannot exceed 255 characters").optional(),
});
