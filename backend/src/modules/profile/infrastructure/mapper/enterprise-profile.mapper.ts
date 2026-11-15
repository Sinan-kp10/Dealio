import { Prisma } from "../../../../../generated/prisma/client";
import { EnterpriseProfileDto, VerificationStatusType } from "../../application/dto/enterprise-profile.dto.js";

export const enterpriseProfileSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  phone_verified: true,
  profile_picture_key: true,
  enterprise: {
    select: {
      id: true,
      enterprise_name: true,
      description: true,
      status: true,
      kyc_status: true,
      bank_status: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      subcategories: {
        select: {
          subcategory: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.usersSelect;

export type EnterpriseProfileRecord = Prisma.usersGetPayload<{ select: typeof enterpriseProfileSelect }>;

export class EnterpriseProfileMapper {
  static toDto(user: EnterpriseProfileRecord): EnterpriseProfileDto {
    const enterprise = user.enterprise;

    const category = enterprise?.category
      ? {
          id: enterprise.category.id,
          name: enterprise.category.name,
        }
      : null;

    const subcategories = enterprise?.subcategories
      .map((item) => ({
        id: item.subcategory.id,
        name: item.subcategory.name,
      })) ?? [];

    const kycStatus = (enterprise?.kyc_status as VerificationStatusType) ?? "REQUIRED";
    const bankRecordStatus = (enterprise?.bank_status as VerificationStatusType) ?? "REQUIRED";

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      phoneVerified: user.phone_verified ?? false,
      profilePictureKey: user.profile_picture_key,
      enterpriseId: enterprise?.id ?? "",
      enterpriseName: enterprise?.enterprise_name ?? "",
      description: enterprise?.description ?? null,
      status: enterprise?.status ?? "",
      category,
      subcategories,
      kycStatus,
      bankRecordStatus,
    };
  }
}
