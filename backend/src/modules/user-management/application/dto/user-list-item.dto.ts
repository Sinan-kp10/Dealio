export interface CustomerListItemDto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role : "ADMIN" | "CUSTOMER" | "ENTERPRISE_MANAGER"
  status: "ACTIVE" | "SUSPENDED";
  createdAt: Date;
  suspendedAt: Date | null;
  suspensionReason: string | null;
}

export interface CustomerListFiltersDto {
  search?: string;
  status?: "ACTIVE" | "SUSPENDED";
  page: number;
  limit: number;
}

export interface PaginatedUsersDto {
  items: CustomerListItemDto[];
  page: number;
  limit: number;
  totalPages : number
}
