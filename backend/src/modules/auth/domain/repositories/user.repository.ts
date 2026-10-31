import { IBaseRepository } from "../../../../shared/domian/base.repository";
import type { SafeUser, User } from "../entities/user.entity";

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
  role: SafeUser["role"];
  enterprise_id?: string | null;
  phone?: string | null;
  emailVerified: boolean;
};

export interface IUserRepository extends IBaseRepository<SafeUser> {
  findById(id: string): Promise<SafeUser | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<SafeUser>;
  updatePassword(id: string, passwordHash: string): Promise<void>;
}
