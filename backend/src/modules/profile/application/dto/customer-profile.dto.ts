export interface CustomerProfileDto {
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  createdAt: Date;
  profilePictureKey: string | null;
}

export interface UpdateCustomerProfileDto {
  userId: string;
  name?: string | null;
  phone?: string | null;
}

export interface UpdatedCustomerProfileFieldsDto {
  name?: string;
  phone?: string | null;
  phone_verified?: boolean;
}
