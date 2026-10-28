import { Prisma } from "../../../../../generated/prisma/client";
import type { Enterprise } from "../../domain/entities/enterprise.entity";

export const enterpriseSelect = {
  id: true,
  enterprise_name: true,
  subcategory_id: true,
  status: true,
  description: true,
  rejection_reason: true,
  reviewed_by: true,
  reviewed_at: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.enterprisesSelect;

export type EnterpriseRecord = Prisma.enterprisesGetPayload<{ select: typeof enterpriseSelect }>;

export class EnterpriseMapper {
  static toEntity(record: EnterpriseRecord): Enterprise {
    return {
      id: record.id,
      enterprise_name: record.enterprise_name,
      subcategory_id: record.subcategory_id,
      status: record.status,
      description: record.description,
      rejection_reason: record.rejection_reason,
      reviewed_by: record.reviewed_by,
      reviewed_at: record.reviewed_at,
      created_at: record.created_at,
      updated_at: record.updated_at,
    };
  }
}

