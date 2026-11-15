export type BusinessType =
  | "PRIVATE_LIMITED"
  | "PUBLIC_LIMITED"
  | "LLP"
  | "PARTNERSHIP"
  | "SOLE_PROPRIETORSHIP"
  | "OTHER";

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  PRIVATE_LIMITED: "Private Limited Company (Pvt Ltd)",
  PUBLIC_LIMITED: "Public Limited Company",
  LLP: "Limited Liability Partnership (LLP)",
  PARTNERSHIP: "Partnership Firm",
  SOLE_PROPRIETORSHIP: "Sole Proprietorship",
  OTHER: "Other",
};

export type DocumentType =
  | "AADHAAR"
  | "PASSPORT"
  | "PAN_CARD"
  | "VOTER_ID"
  | "DRIVING_LICENCE"
  | "GST_CERTIFICATE";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  GST_CERTIFICATE: "Certificate of Incorporation (MCA)",
  PAN_CARD: "PAN Card",
  AADHAAR: "Aadhaar Card",
  PASSPORT: "Passport",
  VOTER_ID: "Voter ID",
  DRIVING_LICENCE: "Driving Licence",
};

export type BankAccountType = "CURRENT" | "SAVINGS";

export const BANK_ACCOUNT_TYPE_LABELS: Record<BankAccountType, string> = {
  CURRENT: "Current Account",
  SAVINGS: "Savings Account",
};

