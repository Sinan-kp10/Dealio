import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { business_type, document_type } from "../../../../../generated/prisma/client";
import { ActiveKycDto, KycRequestDto, SaveEnterpriseKycRequestDto } from "../../application/dto/enterprise-kyc.dto";
import { IEnterpriseKycRepository } from "../../domain/repositories/enterprise-kyc.repository";
import { EnterpriseKycMapper } from "../mapper/enterprise-kyc-mapper";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto";

export class PrismaEnterpriseKycRepository implements IEnterpriseKycRepository {
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

    getKycDetails = async (enterpriseId: string): Promise<{ activeKyc: ActiveKycDto | null; pendingRequest: KycRequestDto | null }> => {
        const [activeKyc, latestRequest] = await Promise.all([
            prisma.enterprise_kyc.findUnique({ where: { enterprise_id: enterpriseId } }),
            prisma.enterprise_kyc_requests.findFirst({
                where: { enterprise_id: enterpriseId },
                orderBy: { created_at: "desc" },
            }),
        ]);

        return {
            activeKyc: activeKyc ? EnterpriseKycMapper.toActiveKycDto(activeKyc) : null,
            pendingRequest: latestRequest && latestRequest.status !== "VERIFIED" ? EnterpriseKycMapper.toRequestDto(latestRequest) : null,
        };
    };

    createKycRequest = async (enterpriseId: string, data: SaveEnterpriseKycRequestDto): Promise<KycRequestDto> => {
        const kyc = await prisma.enterprise_kyc_requests.create({
            data: {
                enterprise_id: enterpriseId,
                business_type: data.businessType as business_type,
                full_legal_name: data.fullLegalName,
                document_type: data.documentType as document_type,
                document_storage_key: data.documentStorageKey,
                status: "PENDING",
            },
        });

        return EnterpriseKycMapper.toRequestDto(kyc);
    };
}
