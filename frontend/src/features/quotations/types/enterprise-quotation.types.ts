export type EnterpriseQuotationStatus = "OPEN" | "PROPOSAL_SENT" | "CLOSED" | "CANCELLED";

export interface EnterpriseQuotationListItem {
  id: string;
  productName: string;
  subCategory: {
    id: string;
    name: string;
  };
  quantity: number;
  description: string;
  status: EnterpriseQuotationStatus;
  createdAt: string;
}

export interface EnterpriseQuotationListParams {
  search?: string;
  status?: EnterpriseQuotationStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface EnterprisePaginatedQuotations {
  items: EnterpriseQuotationListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EnterpriseQuotationListResponse {
  success: boolean;
  message: string;
  data: EnterprisePaginatedQuotations;
}

export interface MarkNotInterestedResponse {
  success: boolean;
  message: string;
}
