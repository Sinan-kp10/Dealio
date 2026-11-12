import { Prisma } from "../../../../../generated/prisma/client";
import { prisma } from "../../../../infrastructure/database/prisma/prisma-client.js";
import { NotFoundError } from "../../../../shared/errors/app-error.js";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto.js";
import {EnterpriseApprovalDetailsDto,PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto,} from "../../application/dto/profile-verification.dto.js";
import { IProfileVerficationRepository } from "../../domain/repositories/profile-verification.repository.js";
import {
    enterpriseApprovalDetailsSelect,
    pendingEnterpriseSelect,
    ProfileVerificationMapper,
} from "../mapper/profile-verification.mapper.js";

export class PrismaProfileVerificationRepository implements IProfileVerficationRepository {
    findById = async (userId: string): Promise<EnterpriseUserDto | null> => {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { id: true, enterprise_id: true },
        });

        if (!user || !user.enterprise_id) return null;

        return {
            userId: user.id,
            enterpriseId: user.enterprise_id,
        };
    };

    pendingEnterprises = async (filters: PendingEnterpriseFiltersDto): Promise<PaginatedPendingEnterprisesDto> => {
        const DEFAULT_LIMIT = 10;
        const page = filters.page || 1;
        const limit = filters.limit || DEFAULT_LIMIT;
        const searchTerm = filters.search?.trim();
        const category = filters.category?.trim();

        const where: Prisma.enterprisesWhereInput = {
            AND: [
                {
                    OR: [
                        {
                            kyc_requests: {
                                some: { status: "PENDING" },
                            },
                        },
                        {
                            bank_account_requests: {
                                some: { status: "PENDING" },
                            },
                        },
                    ],
                },
                ...(category && category !== "ALL"
                    ? [
                        {
                            category: {
                                is: {
                                    name: {
                                        equals: category,
                                        mode: "insensitive" as Prisma.QueryMode,
                                    },
                                },
                            },
                        },
                    ]
                    : []),
                ...(searchTerm
                    ? [
                        {
                            OR: [
                                {
                                    enterprise_name: {
                                        contains: searchTerm,
                                        mode: "insensitive" as Prisma.QueryMode,
                                    },
                                },
                                {
                                    users: {
                                        some: {
                                            role: "ENTERPRISE_MANAGER" as const,
                                            OR: [
                                                {
                                                    name: {
                                                        contains: searchTerm,
                                                        mode: "insensitive" as Prisma.QueryMode,
                                                    },
                                                },
                                                {
                                                    email: {
                                                        contains: searchTerm,
                                                        mode: "insensitive" as Prisma.QueryMode,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    ]
                : []),
            ],
        };

        const [enterprises, total] = await Promise.all([
            prisma.enterprises.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { created_at: "desc" },
                select: pendingEnterpriseSelect,
            }),
            prisma.enterprises.count({ where }),
        ]);

        return {
            items: enterprises.map(ProfileVerificationMapper.toDto),
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            total,
        };
    };

    getEnterpriseApprovalDetails = async (enterpriseId: string): Promise<EnterpriseApprovalDetailsDto | null> => {
        const enterprise = await prisma.enterprises.findUnique({
            where: { id: enterpriseId },
            select: enterpriseApprovalDetailsSelect,
        });

        if (!enterprise) return null;

        return ProfileVerificationMapper.toApprovalDetailsDto(enterprise);
    };

    VerfyEnterpriseKyc = async (enterpriseId: string): Promise<void> => {
        await prisma.$transaction(async (tx)=> {
            const kycRequest = await tx.enterprise_kyc_requests.findFirst({
                where : {enterprise_id : enterpriseId, status : "PENDING"},
                orderBy : {created_at : "desc"}
            })

            if(!kycRequest) {
                throw new NotFoundError("No pending KYC verification request found for this enterprise");
            }

            const verifiedAt = new Date()

            await tx.enterprise_kyc.upsert({
                where : { enterprise_id : enterpriseId},
                create : {
                    enterprise_id : enterpriseId,
                    business_type : kycRequest.business_type,
                    full_legal_name : kycRequest.full_legal_name,
                    document_type : kycRequest.document_type,
                    document_storage_key : kycRequest.document_storage_key,
                    verified_at : verifiedAt
                },
                update : {
                    business_type: kycRequest.business_type,
                    full_legal_name: kycRequest.full_legal_name,
                    document_type: kycRequest.document_type,
                    document_storage_key: kycRequest.document_storage_key,
                    verified_at: verifiedAt,
                }
                
            })

            await tx.enterprise_kyc_requests.update({
                where: { id: kycRequest.id },
                data: {
                    status: "VERIFIED",
                    rejection_reason : null,
                    verified_at: verifiedAt,
                },
            });

            const activeBank = await tx.enterprise_bank_accounts.findFirst({
                where: { enterprise_id: enterpriseId, is_primary: true },
            });

            if (activeBank) {
                await tx.enterprises.update({
                    where: { id: enterpriseId },
                    data: {
                        status: "VERIFIED",
                        verified_at: verifiedAt,
                    },
                });
            }
        })
    }

    rejectEnterpriseKyc = async (enterpriseId: string, reason: string): Promise<void> => {
        await prisma.$transaction(async (tx) => {
            const kycRequest = await tx.enterprise_kyc_requests.findFirst({
                where: { enterprise_id: enterpriseId, status: "PENDING" },
                orderBy: { created_at: "desc" },
            });

            if (!kycRequest) {
                throw new NotFoundError("No pending KYC verification request found for this enterprise");
            }

            await tx.enterprise_kyc_requests.update({
                where: { id: kycRequest.id },
                data: {
                    status: "REJECTED",
                    rejection_reason: reason,
                    verified_at: null,
                },
            });
        });
    };

    verifyEnterpriseBankRecord = async (enterpriseId: string): Promise<void> => {
        await prisma.$transaction(async (tx) => {
            const bankRequest = await tx.enterprise_bank_accounts_requests.findFirst({
                where: { enterprise_id: enterpriseId, status: "PENDING" },
                orderBy: { created_at: "desc" },
            });

            if (!bankRequest) {
                throw new NotFoundError("No pending bank account verification request found for this enterprise");
            }

            const verifiedAt = new Date();

            await tx.enterprise_bank_accounts.updateMany({
                where: { enterprise_id: enterpriseId, is_primary: true },
                data: { is_primary: false },
            });

            await tx.enterprise_bank_accounts.create({
                data: {
                    enterprise_id: enterpriseId,
                    account_holder_name: bankRequest.account_holder_name,
                    account_number: bankRequest.account_number,
                    ifsc_code: bankRequest.ifsc_code,
                    account_type: bankRequest.account_type,
                    upi_id: bankRequest.upi_id,
                    is_primary: true,
                    verified_at: verifiedAt,
                },
            });

            await tx.enterprise_bank_accounts_requests.update({
                where: { id: bankRequest.id },
                data: {
                    status: "VERIFIED",
                    rejection_reason: null,
                    verified_at: verifiedAt,
                },
            });

            const activeKyc = await tx.enterprise_kyc.findUnique({
                where: { enterprise_id: enterpriseId },
            });

            if (activeKyc) {
                await tx.enterprises.update({
                    where: { id: enterpriseId },
                    data: {
                        status: "VERIFIED",
                        verified_at: verifiedAt,
                    },
                });
            }
        });
    };

    rejectEnterpriseBankRecord = async (enterpriseId: string, reason: string): Promise<void> => {
        await prisma.$transaction(async (tx) => {
            const bankRequest = await tx.enterprise_bank_accounts_requests.findFirst({
                where: { enterprise_id: enterpriseId, status: "PENDING" },
                orderBy: { created_at: "desc" },
            });

            if (!bankRequest) {
                throw new NotFoundError("No pending bank account verification request found for this enterprise");
            }

            await tx.enterprise_bank_accounts_requests.update({
                where: { id: bankRequest.id },
                data: {
                    status: "REJECTED",
                    rejection_reason: reason,
                    verified_at: null,
                },
            });
        });
    };
}
