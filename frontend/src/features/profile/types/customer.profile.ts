export interface CustomerProfile {
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  profilePictureKey: string | null;
}

export interface CustomerProfileResponse {
  status: boolean;
  message: string;
  data: CustomerProfile;
}

export interface UpdateCustomerProfile {
  name?: string;
  phone?: string;
}

export type UpdataCustomerProfile = UpdateCustomerProfile;

export interface UpdateCustomerProfileResponse {
  status: boolean;
  message: string;
  data: {
    name?: string;
    phone?: string | null;
  };
}