export interface UserListItemDto {
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

export interface UserListFiltersDto {
  search?: string;
  status?: "ACTIVE" | "SUSPENDED";
  page: number;
  limit: number;
}

export interface PaginatedUsersDto {
  items: UserListItemDto[];
  page: number;
  limit: number;
  totalPages : number
}
