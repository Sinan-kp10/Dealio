export interface CustomerProfileDto {
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
  profilePictureKey: string | null;
}

export interface CustomerUpdateProfileDto {
  userId: string;
  name?: string | null;
  phone?: string | null;
}

export interface UpdatedCustomerProfileFieldsDto {
  name?: string;
  phone?: string | null;
}
