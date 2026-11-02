export interface EnterpriseProfileDto {
  name: string;
  email: string;
  phone: string | null;
  category : string
  subcategory : string
  description : string
  profilePictureKey: string | null;
}

export interface UpdateEnterpriseProfileDto {
  userId: string;
  enterpriseName?: string | null;
  ContactPerson? : string | null
  phone?: string | null;
  category? : string | null;
  subCategory? : string | null
}

export interface UpdatedEnterpriseProfileFieldsDto {
  enterpriseName?: string | null;
  ContactPerson? : string | null
  phone?: string | null;
  category? : string | null;
  subCategory? : string | null
}
