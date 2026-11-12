export {
  BUSINESS_TYPE_LABELS,
  DOCUMENT_TYPE_LABELS,
  type BusinessType,
  type DocumentType,
} from "../../../constants/enterprise.constants";
import type { BusinessType, DocumentType } from "../../../constants/enterprise.constants";

export type KycStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface BaseKycRecord {
  id: string;
  businessType: BusinessType;
  fullLegalName: string;
  documentType: DocumentType;
  documentUrl?: string | null;
  verifiedAt: string | null;
}

export type ActiveKycRecord = BaseKycRecord;

export interface KycRequestRecord extends BaseKycRecord {
  status: KycStatus;
  rejectionReason: string | null;
}

export type KycRecord = KycRequestRecord;

export interface EnterpriseKycDetails {
  activeKyc: ActiveKycRecord | null;
  pendingRequest: KycRequestRecord | null;
}
export interface EnterpriseKycDetailsResponse {
  success: boolean;
  message: string;
  data: EnterpriseKycDetails;
}

export interface SubmitKycResponse {
  success: boolean;
  message: string;
  data: KycRequestRecord;
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
