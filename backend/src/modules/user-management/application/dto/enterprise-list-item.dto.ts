export interface EnterpriseListItemDto {
  id: string;
  enterpriseName: string;
  email: string;
  phone: string | null;
  category: string | null;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: Date;
  suspendedAt: Date | null;
  suspensionReason: string | null;
}

export interface EnterpriseListFiltersDto {
  search?: string;
  status?: "ACTIVE" | "SUSPENDED";
  category?: string;
  page: number;
  limit: number;
}

export interface PaginatedEnterprisesDto {
  items: EnterpriseListItemDto[];
  page: number;
  limit: number;
  totalPages: number;
}