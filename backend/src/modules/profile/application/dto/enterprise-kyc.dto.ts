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

export interface BaseKycDto {
  id: string;
  businessType: string;
  fullLegalName: string;
  documentType: string;
  documentStorageKey: string;
  documentUrl?: string | null;
  verifiedAt: Date | null;
}

export type ActiveKycDto = BaseKycDto;

export interface KycRequestDto extends BaseKycDto {
  status: string;
  rejectionReason: string | null;
}

export type KycRecordDto = KycRequestDto;

export interface EnterpriseKycDetailsDto {
  activeKyc: ActiveKycDto | null;
  pendingRequest: KycRequestDto | null;
}
