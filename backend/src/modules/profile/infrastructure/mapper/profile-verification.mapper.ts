import { Prisma } from "../../../../../generated/prisma/client";
import type { PendingEnterpriseListItemDto } from "../../application/dto/profile-verification.dto.js";

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
}
