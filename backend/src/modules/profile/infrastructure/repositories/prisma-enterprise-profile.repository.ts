import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { EnterpriseProfileDto } from "../../application/dto/enterprise-profile.dto";
import { IEnterpriseProfileRepository } from "../../domain/repositories/enterprise-profile.repository";
import { EnterpriseProfileMapper, enterpriseProfileSelect } from "../mapper/enterprise-profile.mapper";


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
