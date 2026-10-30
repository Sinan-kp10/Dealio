import { UserRole } from "../../domain/entities/user.entity";

export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

