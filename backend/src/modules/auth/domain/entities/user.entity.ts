export type UserRole = "ADMIN" | "ENTERPRISE_MANAGER" | "CUSTOMER"

export type UserStatus = "ACTIVE" | "SUSPENDED"

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  enterprise_id: string | null;
  phone: string | null;
  profile_picture_key: string | null;
  email_verified: boolean
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
  suspended_at: Date | null;
  suspension_reason: string | null;
}