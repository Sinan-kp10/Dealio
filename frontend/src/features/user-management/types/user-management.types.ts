export type CustomerStatus = "ACTIVE" | "SUSPENDED";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: CustomerStatus;
  createdAt: string;
  suspendedAt: string | null;
  suspensionReason: string | null;
}

export interface CustomerListParams {
  search?: string;
  status?: CustomerStatus;
  page: number;
  limit: number;
}

export interface PaginatedCustomers {
  items: Customer[];
  page: number;
  limit: number;
  totalPages: number;
}

export interface CustomerListResponse {
  success: boolean;
  data: PaginatedCustomers;
}