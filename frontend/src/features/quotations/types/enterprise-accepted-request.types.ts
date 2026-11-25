export type AcceptedRequestStatus = "ACCEPTED" | "PAID" | "COMPLETED";

export interface EnterpriseAcceptedRequestListItem {
  id: string;
  quotationId: string;
  productName: string;
  status: AcceptedRequestStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  description: string;
  acceptedAt: string;
}

export interface EnterpriseAcceptedRequestParams {
  search?: string;
  status?: AcceptedRequestStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface PaginatedEnterpriseAcceptedRequests {
  items: EnterpriseAcceptedRequestListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EnterpriseAcceptedRequestsResponse {
  success: boolean;
  message: string;
  data: PaginatedEnterpriseAcceptedRequests;
}
