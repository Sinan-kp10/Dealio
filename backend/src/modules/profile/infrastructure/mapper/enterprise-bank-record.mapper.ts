import { enterprise_bank_accounts, enterprise_bank_accounts_requests } from "../../../../../generated/prisma/client";
import { ActiveBankRecordDto, BankRecordRequestDto, } from "../../application/dto/enterprise-bank-details.dto";

export class EnterpriseBankMapper {
    static toActiveBankRecordDto(record : enterprise_bank_accounts): ActiveBankRecordDto {
        return {
            id: record.id,
            accountHolderName: record.account_holder_name,
            bankAccountNumber: record.account_number,
            ifscCode : record.ifsc_code,
            accountType : record.account_type,
            upiId : record.upi_id ?? null,
            verifiedAt: record.verified_at ?? null,
        };
    }

    static toRequestDto(record: enterprise_bank_accounts_requests): BankRecordRequestDto {
        return {
            id: record.id,
            accountHolderName: record.account_holder_name,
            bankAccountNumber: record.account_number,
            ifscCode : record.ifsc_code,
            accountType : record.account_type,
            upiId : record.upi_id ?? null,
            status: record.status,
            rejectionReason: record.rejection_reason ?? null,
            verifiedAt: record.verified_at ?? null,
        };
    }
}