import { Prisma } from "../../../../../generated/prisma/client";
import { CustomerProfileDto } from "../../application/dto/customer-profile.dto.js";

export const customerProfileSelect = {
  name: true,
  email: true,
  phone: true,
  created_at: true,
  profile_picture_key: true,
} satisfies Prisma.usersSelect;

export type CustomerProfileRecord = Prisma.usersGetPayload<{ select: typeof customerProfileSelect }>;

export class CustomerProfileMapper {
  static toDto(user: CustomerProfileRecord): CustomerProfileDto {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.created_at,
      profilePictureKey: user.profile_picture_key,
    };
  }
}
