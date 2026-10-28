export type UserRole = "ADMIN" | "ENTERPRISE_MANAGER" | "CUSTOMER";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  suspension_reason: string | null;
  enterprise_id: string | null;
  phone: string | null;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface User extends SafeUser {
  password_hash: string;
  profile_picture_key: string | null;
  suspended_at: Date | null;
}
