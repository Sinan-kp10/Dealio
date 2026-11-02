import { Prisma } from "../../../../../generated/prisma/client";
import type { EnterpriseListItemDto } from "../../application/dto/enterprise-list-item.dto";

export const enterpriseListSelect = {
    id: true,
    enterprise_name: true,
    status: true,
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
            status: true,
            suspended_at: true,
            suspension_reason: true,
        },
    },
} satisfies Prisma.enterprisesSelect;

export type EnterpriseListRecord = Prisma.enterprisesGetPayload<{ select: typeof enterpriseListSelect }>;

export class EnterpriseManagementMapper {
    static toDto(enterprise: EnterpriseListRecord): EnterpriseListItemDto {
        const manager = enterprise.users[0];
        const categoryName = enterprise.category?.name ?? null;

        return {
            id: manager?.id ?? enterprise.id,
            enterpriseName: enterprise.enterprise_name,
            email: manager?.email ?? "",
            phone: manager?.phone ?? null,
            category: categoryName,
            status: manager?.status ?? "ACTIVE",
            createdAt: enterprise.created_at,
            suspendedAt: manager?.suspended_at ?? null,
            suspensionReason: manager?.suspension_reason ?? null,
        };
    }
}
