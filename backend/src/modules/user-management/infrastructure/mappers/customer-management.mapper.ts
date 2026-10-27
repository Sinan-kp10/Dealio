import { Prisma } from "../../../../../generated/prisma/client";
import type { CustomerListItemDto } from "../../application/dto/customer-list-item.dto";

export const customerListSelect = {
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

export type CustomerListRecord = Prisma.usersGetPayload<{select: typeof customerListSelect}>

export class CustomerManagementMapper {
    static toDto(user: CustomerListRecord): CustomerListItemDto {
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
