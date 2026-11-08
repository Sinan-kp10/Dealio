export interface CategoryDto {
  id: string;
  name: string;
}

export interface SubcategoryDto {
  id: string;
  name: string;
}

export interface EnterpriseProfileDto {
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
  category: CategoryDto | null;
  subcategories: SubcategoryDto[];
}

export interface UpdateEnterpriseDetailsDto {
  userId: string;
  enterpriseName?: string;
  contactPerson?: string;
  categoryId?: string;
  description?: string | null;
  subcategoryIds?: string[];
}

export interface UpdatedEnterpriseDetailsDto {
  enterpriseName?: string;
  contactPerson?: string;
  categoryId?: string;
  description?: string | null;
  subcategoryIds?: string[];
}
