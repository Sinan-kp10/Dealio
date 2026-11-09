import { z } from "zod";

export const CreateEnterpriseKycSchema = z.object({
  businessType: z.enum(
    ["PRIVATE_LIMITED", "PUBLIC_LIMITED", "LLP", "PARTNERSHIP", "SOLE_PROPRIETORSHIP", "OTHER"],
    { message: "Valid business type is required" }
  ),
  fullLegalName: z
    .string()
    .trim()
    .min(2, "Full legal name must contain at least 2 characters")
    .max(255, "Full legal name cannot exceed 255 characters"),
  documentType: z.enum(
    ["AADHAAR", "PASSPORT", "PAN_CARD", "VOTER_ID", "DRIVING_LICENCE", "GST_CERTIFICATE"],
    { message: "Valid document type is required" }
  ),
});

