import type { User, UserStatus } from "../entities/user.entity";

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
  role: User["role"];
  enterprise_id?: string | null;
  phone?: string | null;
  status : UserStatus
  emailVerified: boolean
};

export interface UserRepository {
    
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: CreateUserData): Promise<User>;
}
