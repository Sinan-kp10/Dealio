export type AvailableQuotationStatus = "OPEN" | "PROPOSAL_SENT" | "CLOSED" | "CANCELLED";

export interface AvailableQuotation {
  id: string;
  customerId: string;
  productName: string;
  subCategory: {
    id: string;
    name: string;
  };
  quantity: number;
  description: string;
  status: AvailableQuotationStatus;
  createdAt: string;
}

export interface AvailableQuotationParams {
  search?: string;
  status?: AvailableQuotationStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface PaginatedAvailableQuotations {
  items: AvailableQuotation[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AvailableQuotationsResponse {
  success: boolean;
  message: string;
  data: PaginatedAvailableQuotations;
}

export interface MarkNotInterestedResponse {
  success: boolean;
  message: string;
}
