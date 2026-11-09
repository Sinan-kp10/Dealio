import type { enterprise_kyc, enterprise_kyc_requests } from "../../../../../generated/prisma/client";
import { KycRecordDto } from "../../application/dto/enterprise-kyc.dto";

export class EnterpriseKycMapper {
    static toActiveKycDto(record: enterprise_kyc): KycRecordDto {
        return {
            id: record.id,
            businessType: record.business_type,
            fullLegalName: record.full_legal_name,
            documentType: record.document_type,
            documentStorageKey: record.document_storage_key,
            status: "VERIFIED",
            rejectionReason: null,
            verifiedAt: record.verified_at ?? null,
        };
    }

    static toRequestDto(record: enterprise_kyc_requests): KycRecordDto {
        return {
            id: record.id,
            businessType: record.business_type,
            fullLegalName: record.full_legal_name,
            documentType: record.document_type,
            documentStorageKey: record.document_storage_key,
            status: record.status,
            rejectionReason: record.rejection_reason ?? null,
            verifiedAt: record.verified_at ?? null,
        };
    }
}