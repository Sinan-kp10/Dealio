import { Prisma } from "../../../../../generated/prisma/client";
import type { SafeUser } from "../../domain/entities/user.entity";

export const customerSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  suspension_reason: true,
  enterprise_id: true,
  phone: true,
  email_verified: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.usersSelect;

export type CustomerRecord = Prisma.usersGetPayload<{ select: typeof customerSelect }>;

export class CustomerMapper {
  static toSafeCustomer(user: CustomerRecord): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      suspension_reason: user.suspension_reason,
      enterprise_id: user.enterprise_id,
      phone: user.phone,
      email_verified: user.email_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
