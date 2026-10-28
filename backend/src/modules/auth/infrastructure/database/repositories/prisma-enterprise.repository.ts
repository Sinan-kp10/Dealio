import { CreatedEnterpriseResult, CreateEnterpriseData, EnterpriseRepository } from "../../../domain/repositories/enterprise.repository";
import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";
import { Enterprise } from "../../../domain/entities/enterprise.entity";
import { enterpriseSelect, EnterpriseMapper } from "../../mappers/enterprise.mapper";

export class PrismaEnterpriseRepository implements EnterpriseRepository {

    findById = async (id: string): Promise<Enterprise | null> => {
        const enterprise = await prisma.enterprises.findUnique({
            where: { id },
            select: enterpriseSelect,
        });

        return enterprise ? EnterpriseMapper.toEntity(enterprise) : null;
    };

    findUserByEmail = async (email: string): Promise<boolean> => {
        const user = await prisma.users.findUnique({
            where: { email },
            select: { id: true },
        });

        return user !== null;
    };

    create = async (data: CreateEnterpriseData): Promise<CreatedEnterpriseResult> => {
        return prisma.$transaction(async (tx) => {
            const enterprise = await tx.enterprises.create({
                data: {
                    enterprise_name: data.companyName,
                },
                select: {
                    id: true,
                    enterprise_name: true,
                },
            });

            const user = await tx.users.create({
                data: {
                    name: data.contactPersonName,
                    email: data.email,
                    phone: data.phone,
                    password_hash: data.passwordHash,
                    role: data.role,
                    enterprise_id: enterprise.id,
                    email_verified: true,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    status: true,
                    role: true,
                },
            });

            return {
                enterprise: {
                    id: enterprise.id,
                    name: enterprise.enterprise_name,
                },
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    role: user.role,
                },
            };
        });
    };
}