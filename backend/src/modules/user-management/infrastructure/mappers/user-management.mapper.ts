import { Prisma } from "../../../../../generated/prisma/client";
import type { UserListItemDto } from "../../application/dto/user-list-item.dto";

export const userListSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role : true,
  status: true,
  created_at: true,
  suspended_at: true,
  suspension_reason: true,
} satisfies Prisma.usersSelect

export type UserListRecord = Prisma.usersGetPayload<{select: typeof userListSelect}>

export class UserManagementMapper {
    static toDto(user: UserListRecord): UserListItemDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role : user.role,
            status: user.status,
            createdAt: user.created_at,
            suspendedAt: user.suspended_at,
            suspensionReason: user.suspension_reason,
        };
    }
}
