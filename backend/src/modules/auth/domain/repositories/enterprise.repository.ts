import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { Enterprise } from "../entities/enterprise.entity";
import type { User, UserStatus } from "../entities/user.entity";

export type CreateEnterpriseData = {
  enterpriseName: string;
  contactPersonName: string;
  email: string;
  passwordHash: string;
  phone: string;
  role: User["role"];
  emailVerified: boolean;
};

export type CreatedEnterpriseResult = {
  enterprise: {
    id: string;
    name: string;
  };
  data: {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    role: string;
  };
};

export interface IEnterpriseRepository extends IBaseRepository<Enterprise> {
  findUserByEmail(email: string): Promise<boolean>;

  create(data: CreateEnterpriseData): Promise<CreatedEnterpriseResult>;
}
