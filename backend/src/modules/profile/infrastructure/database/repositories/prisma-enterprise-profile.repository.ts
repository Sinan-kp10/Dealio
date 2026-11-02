import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client.js";
import { EnterpriseProfileDto } from "../../../application/dto/enterprise-profile.dto.js";
import { IEnterpriseProfileRepository } from "../../../domain/repositories/enterprise-profile.repository.js";
import { EnterpriseProfileMapper, enterpriseProfileSelect } from "../../mapper/enterprise-profile.mapper.js";

export class PrismaEnterpriseProfileRepository implements IEnterpriseProfileRepository {

    findById = async (id: string): Promise<EnterpriseProfileDto | null> => {
        const user = await prisma.users.findUnique({
            where: { id },
            select: enterpriseProfileSelect,
        });

        return user ? EnterpriseProfileMapper.toDto(user) : null;
    };

    findEnterpriseProfile = async (id: string): Promise<EnterpriseProfileDto | null> => {
        const user = await prisma.users.findUnique({
            where: { id },
            select: enterpriseProfileSelect,
        });

        return user ? EnterpriseProfileMapper.toDto(user) : null;
    };
}
