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
  profilePictureKey: string | null;
  createdAt: Date;
  enterpriseId: string;
  enterpriseName: string;
  description: string | null;
  status: string;
  category: Category | null;
  subcategories: Subcategory[];
}

export interface EnterpriseProfileResponse {
  status: boolean;
  message: string;
  data: EnterpriseProfile;
}

