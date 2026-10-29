export interface CustomerProfile {
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  profilePictureKey: string | null;
}

export interface CustomerProfileResponse {
  status: "success";
  data: CustomerProfile;
}