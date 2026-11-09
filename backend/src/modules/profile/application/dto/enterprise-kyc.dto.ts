export interface CreateEnterpriseKycDto {
  userId: string;
  businessType: string;
  fullLegalName: string;
  documentType: string;
  file: {
    buffer: Buffer;
    mimetype: string;
    size: number;
  };
}

export interface UpdateEnterpriseKycDto {
  userId: string;
  businessType?: string;
  fullLegalName?: string;
  documentType?: string;
  file?: {
    buffer: Buffer;
    mimetype: string;
    size: number;
  };
}

export interface SaveEnterpriseKycRequestDto {
  businessType: string;
  fullLegalName: string;
  documentType: string;
  documentStorageKey: string;
}

export interface KycRecordDto {
  id: string;
  businessType: string;
  fullLegalName: string;
  documentType: string;
  documentStorageKey: string;
  documentUrl?: string | null;
  status: string;
  rejectionReason: string | null;
  verifiedAt: Date | null;
}

export interface EnterpriseKycDetailsDto {
  activeKyc: KycRecordDto | null;
  pendingRequest: KycRecordDto | null;
}
