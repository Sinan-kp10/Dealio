import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { EnterpriseProfileDto, UpdatedEnterpriseDetailsDto } from "../../application/dto/enterprise-profile.dto";
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

    updateEnterpriseDetails = async (userId: string,enterpriseId: string,data: UpdatedEnterpriseDetailsDto): Promise<UpdatedEnterpriseDetailsDto> => {
        await prisma.$transaction(async (tx) => {
            if (data.contactPerson) {
                await tx.users.update({
                    where: { id: userId },
                    data: { name: data.contactPerson },
                });
            }

            if (enterpriseId) {
                await tx.enterprises.update({
                    where: { id: enterpriseId },
                    data: {
                        enterprise_name: data.enterpriseName,
                        category_id: data.categoryId,
                        description: data.description,
                    },
                });

                if (data.subcategoryIds) {
                    await tx.enterprise_subcategories.deleteMany({
                        where: { enterprise_id: enterpriseId },
                    });

                    if (data.subcategoryIds.length > 0) {
                        await tx.enterprise_subcategories.createMany({
                            data: data.subcategoryIds.map((subcategoryId) => ({
                                enterprise_id: enterpriseId,
                                subcategory_id: subcategoryId,
                            })),
                        });
                    }
                }
            }
        });

        return data;
    };
}
