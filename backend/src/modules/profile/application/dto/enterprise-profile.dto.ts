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
  profilePictureKey: string | null;
  createdAt: Date;
  enterpriseId: string;
  enterpriseName: string;
  description: string | null;
  status: string;
  category: CategoryDto | null;
  subcategories: SubcategoryDto[];
}

export interface UpdateEnterpriseProfileDto {
  userId: string;
  enterpriseName?: string | null;
  contactPerson?: string | null;
  description?: string | null;
  categoryId?: string | null;
  subcategoryIds?: string[];
}

export interface UpdatedEnterpriseProfileFieldsDto {
  enterpriseName?: string | null;
  contactPerson?: string | null;
  description?: string | null;
  subcategoryIds?: string[];
}
