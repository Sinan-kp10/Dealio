import { z } from "zod";

export const CreateEnterpriseBankRecordSchema = z.object({
  AccountHolderName: z
    .string()
    .trim()
    .min(2, "Account holder name must contain at least 2 characters")
    .max(255, "Account holder name cannot exceed 255 characters")
    .optional(),
  accountHolderName: z
    .string()
    .trim()
    .min(2, "Account holder name must contain at least 2 characters")
    .max(255, "Account holder name cannot exceed 255 characters")
    .optional(),
  BankAccountNumber: z
    .string()
    .trim()
    .min(8, "Bank account number must be at least 8 digits")
    .max(255, "Bank account number cannot exceed 255 characters")
    .optional(),
  bankAccountNumber: z
    .string()
    .trim()
    .min(8, "Bank account number must be at least 8 digits")
    .max(255, "Bank account number cannot exceed 255 characters")
    .optional(),
  accountNumber: z
    .string()
    .trim()
    .min(8, "Bank account number must be at least 8 digits")
    .max(255, "Bank account number cannot exceed 255 characters")
    .optional(),
  ifscCode: z
    .string()
    .trim()
    .min(4, "IFSC code is required")
    .max(11, "IFSC code cannot exceed 11 characters"),
  accountType: z.enum(["CURRENT", "SAVINGS"], {
    message: "Valid account type (CURRENT or SAVINGS) is required",
  }),
  upiId: z.string().trim().max(255, "UPI ID cannot exceed 255 characters").optional(),
}).refine(
  (data) => Boolean(data.AccountHolderName || data.accountHolderName),
  { message: "Account holder name is required", path: ["accountHolderName"] }
).refine(
  (data) => Boolean(data.BankAccountNumber || data.bankAccountNumber || data.accountNumber),
  { message: "Bank account number is required", path: ["bankAccountNumber"] }
);

export type CreateEnterpriseBankRecordInput = z.infer<typeof CreateEnterpriseBankRecordSchema>;

