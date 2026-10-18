export type UserRole =
  | "SUPER_ADMIN"
  | "ENTERPRISE_MANAGER"
  | "CUSTOMER";

export type UserStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING"
  | "REJECTED";

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  enterprise_id: string | null;
  phone: string | null;
  profile_picture_url: string | null;
  email_verified_at: Date | null;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
  suspended_at: Date | null;
  suspended_by: string | null;
  suspension_reason: string | null;
}