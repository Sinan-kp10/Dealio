import type { enterprise_kyc, enterprise_kyc_requests } from "../../../../../generated/prisma/client";
import { KycRecordDto } from "../../application/dto/enterprise-kyc.dto";

type KycRecordInput = enterprise_kyc | enterprise_kyc_requests;

export class EnterpriseKycMapper {
    static toDto(record: KycRecordInput): KycRecordDto {
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