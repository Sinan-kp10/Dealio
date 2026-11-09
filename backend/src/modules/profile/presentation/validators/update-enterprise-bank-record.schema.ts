import { z } from "zod";

export const UpdateEnterpriseBankRecordSchema = z.object({
  AccountHolderName: z.string().trim().min(2, "Account holder name must contain at least 2 characters").max(255).optional(),
  accountHolderName: z.string().trim().min(2, "Account holder name must contain at least 2 characters").max(255).optional(),
  BankAccountNumber: z.string().trim().min(8, "Bank account number must be at least 8 digits").max(255).optional(),
  bankAccountNumber: z.string().trim().min(8, "Bank account number must be at least 8 digits").max(255).optional(),
  accountNumber: z.string().trim().min(8, "Bank account number must be at least 8 digits").max(255).optional(),
  ifscCode: z.string().trim().min(4, "IFSC code must be at least 4 characters").max(11).optional(),
  accountType: z.enum(["CURRENT", "SAVINGS"], {
    message: "Valid account type (CURRENT or SAVINGS) is required",
  }).optional(),
  upiId: z.string().trim().max(255).optional(),
});

export type UpdateEnterpriseBankRecordInput = z.infer<typeof UpdateEnterpriseBankRecordSchema>;

