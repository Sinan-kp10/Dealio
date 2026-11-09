export type BusinessType =| "PRIVATE_LIMITED"| "PUBLIC_LIMITED"| "LLP"| "PARTNERSHIP"| "SOLE_PROPRIETORSHIP"| "OTHER"

export type DocumentType =| "AADHAAR"| "PASSPORT"| "PAN_CARD"| "VOTER_ID"| "DRIVING_LICENCE"| "GST_CERTIFICATE"

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  PRIVATE_LIMITED: "Private Limited Company (Pvt Ltd)",
  PUBLIC_LIMITED: "Public Limited Company",
  LLP: "Limited Liability Partnership (LLP)",
  PARTNERSHIP: "Partnership Firm",
  SOLE_PROPRIETORSHIP: "Sole Proprietorship",
  OTHER: "Other",
};

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  GST_CERTIFICATE: "Certificate of Incorporation (MCA)",
  PAN_CARD: "PAN Card",
  AADHAAR: "Aadhaar Card",
  PASSPORT: "Passport",
  VOTER_ID: "Voter ID",
  DRIVING_LICENCE: "Driving Licence",
};

export type KycStatus = "PENDING" | "VERIFIED" | "REJECTED"

export interface KycRecord {
  id: string;
  businessType: BusinessType;
  fullLegalName: string;
  documentType: DocumentType;
  documentUrl: string | null;
  status: KycStatus;
  rejectionReason: string | null;
  verifiedAt: string | null;
}

export interface EnterpriseKycDetails {
  activeKyc: KycRecord | null;
  pendingRequest: KycRecord | null;
}
export interface EnterpriseKycDetailsResponse {
  success: boolean;
  message: string;
  data: EnterpriseKycDetails;
}

export interface SubmitKycResponse {
  success: boolean;
  message: string;
  data: KycRecord;
}

export interface CreateEnterpriseKycFormData {
  businessType: BusinessType;
  fullLegalName: string;
  documentType: DocumentType;
  image: File | string;
}

export interface CreateEnterpriseKycInput {
  businessType: BusinessType;
  fullLegalName: string;
  documentType: DocumentType;
  image?: File;
}

export interface UpdateEnterpriseKycInput {
  businessType?: BusinessType;
  fullLegalName?: string;
  documentType?: DocumentType;
  image?: File;
}
