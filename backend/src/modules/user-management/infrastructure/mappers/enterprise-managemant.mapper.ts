import { Prisma } from "../../../../../generated/prisma/client";
import type { EnterpriseListItemDto } from "../../application/dto/enterprise-list-item.dto";

export const enterpriseListSelect = {
    id: true,
    enterprise_name: true,
    status: true,
    created_at: true,
    subcategory: {
        select: {
            name: true,
            category: {
                select: {
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
            id: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            suspended_at: true,
            suspension_reason: true,
        },
    },
} satisfies Prisma.enterprisesSelect;

export type EnterpriseListRecord = Prisma.enterprisesGetPayload<{select: typeof enterpriseListSelect}>;

export class EnterpriseManagementMapper {
    static toDto(enterprise: EnterpriseListRecord): EnterpriseListItemDto {
        const manager = enterprise.users[0];

        return {
            id: manager?.id ?? enterprise.id,
            enterpriseName: enterprise.enterprise_name,
            email: manager?.email ?? "",
            phone: manager?.phone ?? null,
            category: enterprise.subcategory?.category?.name ?? enterprise.subcategory?.name ?? null,
            status: manager?.status ?? "ACTIVE",
            createdAt: enterprise.created_at,
            suspendedAt: manager?.suspended_at ?? null,
            suspensionReason: manager?.suspension_reason ?? null,
        };
    }
}