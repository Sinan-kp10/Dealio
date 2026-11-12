import { Prisma } from "../../../../../generated/prisma/client";
import type { Enterprise } from "../../domain/entities/enterprise.entity";

export const enterpriseSelect = {
  id: true,
  enterprise_name: true,
  category_id: true,
  status: true,
  description: true,
  verified_at: true,
  created_at: true,
  updated_at: true,
  subcategories: {
    select: {
      subcategory_id: true,
    },
  },
} satisfies Prisma.enterprisesSelect;

export type EnterpriseRecord = Prisma.enterprisesGetPayload<{ select: typeof enterpriseSelect }>;

export class EnterpriseMapper {
  static toEntity(record: EnterpriseRecord): Enterprise {
    return {
      id: record.id,
      enterprise_name: record.enterprise_name,
      category_id: record.category_id,
      status: record.status,
      description: record.description,
      verified_at: record.verified_at,
      created_at: record.created_at,
      updated_at: record.updated_at,
      subcategories: record.subcategories,
    };
  }
}
