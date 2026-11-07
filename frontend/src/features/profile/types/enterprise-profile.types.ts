export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface EnterpriseProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  profilePictureKey: string | null;
  enterpriseId: string;
  enterpriseName: string;
  description: string | null;
  status: string;
  category: Category | null;
  subcategories: Subcategory[];
}

export interface EnterpriseProfileResponse {
  success: boolean;
  message: string;
  data: EnterpriseProfile;
}

