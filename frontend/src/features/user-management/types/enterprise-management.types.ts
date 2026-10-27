export type EnterpriseStatus = "ACTIVE" | "SUSPENDED";

export interface Enterprise {
  id: string;
  enterpriseName: string;
  email: string;
  phone: string | null;
  category: string | null;
  status: EnterpriseStatus;
  createdAt: string;
  suspendedAt: string | null;
  suspensionReason: string | null;
}

export interface EnterpriseListParams {
  search?: string;
  status?: EnterpriseStatus;
  category?: string;
  page: number;
  limit: number;
}

export interface PaginatedEnterprises {
  items: Enterprise[];
  page: number;
  limit: number;
  totalPages: number;
}

export interface EnterpriseListResponse {
  success: boolean;
  data: PaginatedEnterprises;
}