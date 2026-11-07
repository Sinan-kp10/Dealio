export interface CustomerProfile {
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  createdAt: string;
  profilePictureKey: string | null;
}

export interface CustomerProfileResponse {
  success: boolean;
  message: string;
  data: CustomerProfile;
}

export interface UpdateCustomerProfile {
  name?: string;
  phone?: string;
}

export type UpdataCustomerProfile = UpdateCustomerProfile;

export interface UpdateCustomerProfileResponse {
  success: boolean;
  message: string;
  data: {
    name?: string;
    phone?: string | null;
  };
}
