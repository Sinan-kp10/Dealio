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
  phone_verified?: boolean;
  email_verified: boolean;
  profile_picture_key: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface User extends SafeUser {
  password_hash: string;
  suspended_at: Date | null;
}
