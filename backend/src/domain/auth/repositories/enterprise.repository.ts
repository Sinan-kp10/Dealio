import type { UserStatus } from "../entities/user.entity";

export type CreateEnterpriseData = {
  companyName: string;
  contactPersonName: string;
  email: string;
  passwordHash: string;
  phone: string;
}

export type CreatedEnterpriseResult = {
  enterprise: {
    id: string;
    name: string;
  }
  data: {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
  }
}

export interface EnterpriseRepository {
  findUserByEmail(email: string): Promise<boolean>;

  create(data: CreateEnterpriseData): Promise<CreatedEnterpriseResult>;
}
