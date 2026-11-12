import { Prisma } from "../../../../../generated/prisma/client";
import type { EnterpriseApprovalDetailsDto, PendingEnterpriseListItemDto, VerificationStatus,} from "../../application/dto/profile-verification.dto.js";

export const pendingEnterpriseSelect = {
    id: true,
    enterprise_name: true,
    created_at: true,
    category: {
        select: {
            name: true,
        },
    },
    users: {
        where: {
            role: "ENTERPRISE_MANAGER",
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
        },
    },
} satisfies Prisma.enterprisesSelect;

export type PendingEnterpriseRecord = Prisma.enterprisesGetPayload<{ select: typeof pendingEnterpriseSelect }>;

export const enterpriseApprovalDetailsSelect = {
    id: true,
    enterprise_name: true,
    description: true,
    created_at: true,
    category: {
        select: {
            id: true,
            name: true,
        },
    },
    subcategories: {
        select: {
            subcategory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
    users: {
        where: {
            role: "ENTERPRISE_MANAGER",
        },
        select: {
            name: true,
            email: true,
            phone: true,
            phone_verified: true,
        },
    },
    kyc_requests: {
        orderBy: {
            created_at: "desc",
        },
        take: 1,
        select: {
            id: true,
            business_type: true,
            full_legal_name: true,
            document_type: true,
            document_storage_key: true,
            status: true,
            rejection_reason: true,
            created_at: true,
        },
    },
    kyc: {
        select: {
            id: true,
            business_type: true,
            full_legal_name: true,
            document_type: true,
            document_storage_key: true,
            created_at: true,
        },
    },
    bank_account_requests: {
        orderBy: {
            created_at: "desc",
        },
        take: 1,
        select: {
            id: true,
            account_holder_name: true,
            account_number: true,
            ifsc_code: true,
            account_type: true,
            upi_id: true,
            status: true,
            rejection_reason: true,
            created_at: true,
        },
    },
    bank_accounts: {
        where: {
            is_primary: true,
        },
        take: 1,
        select: {
            id: true,
            account_holder_name: true,
            account_number: true,
            ifsc_code: true,
            account_type: true,
            upi_id: true,
            created_at: true,
        },
    },
} satisfies Prisma.enterprisesSelect;

export type EnterpriseApprovalDetailsRecord = Prisma.enterprisesGetPayload<{select: typeof enterpriseApprovalDetailsSelect}>;

export class ProfileVerificationMapper {
    static toDto(enterprise: PendingEnterpriseRecord): PendingEnterpriseListItemDto {
        const manager = enterprise.users[0];
        const categoryName = enterprise.category?.name ?? null;

        return {
            id: enterprise.id,
            enterpriseName: enterprise.enterprise_name,
            contactPerson: manager?.name ?? "",
            email: manager?.email ?? "",
            phone: manager?.phone ?? null,
            categoryName,
            createdAt: enterprise.created_at,
        };
    }

    static toApprovalDetailsDto(record: EnterpriseApprovalDetailsRecord): EnterpriseApprovalDetailsDto {
        const manager = record.users[0];
        const latestKycRequest = record.kyc_requests[0];
        const kyc = latestKycRequest ?? record.kyc;

        const latestBankRequest = record.bank_account_requests[0];
        const bank = latestBankRequest ?? record.bank_accounts[0];

        const kycDto = kyc
            ? {
                id: kyc.id,
                enterpriseId: record.id,
                businessType: kyc.business_type,
                legalName: kyc.full_legal_name,
                documentType: kyc.document_type,
                documentKey: kyc.document_storage_key,
                documentUrl: null,
                status: (latestKycRequest ? latestKycRequest.status : "VERIFIED") as VerificationStatus,
                rejectionReason: latestKycRequest?.rejection_reason ?? null,
                createdAt: kyc.created_at,
            }
            : null;

        const bankDto = bank
            ? {
                id: bank.id,
                enterpriseId: record.id,
                accountHolderName: bank.account_holder_name,
                accountNumber: bank.account_number,
                ifscCode: bank.ifsc_code,
                accountType: bank.account_type,
                upiId: bank.upi_id ?? null,
                status: (latestBankRequest ? latestBankRequest.status : "VERIFIED") as VerificationStatus,
                rejectionReason: latestBankRequest?.rejection_reason ?? null,
                createdAt: bank.created_at,
            }
            : null;

        return {
            companyInfo: {
                enterpriseId: record.id,
                enterpriseName: record.enterprise_name,
                contactPerson: manager?.name ?? "",
                email: manager?.email ?? "",
                phone: manager?.phone ?? null,
                phoneVerified: manager?.phone_verified ?? false,
                category: record.category
                    ? {
                        id: record.category.id,
                        name: record.category.name,
                    }
                    : null,
                subcategories: record.subcategories.map((s) => ({
                    id: s.subcategory.id,
                    name: s.subcategory.name,
                })),
                description: record.description ?? null,
                createdAt: record.created_at,
            },
            kyc: kycDto,
            bankAccount: bankDto,
        };
    }
}

