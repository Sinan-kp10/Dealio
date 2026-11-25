export type EnterpriseAcceptedRequestStatus = "ACCEPTED" | "PAID" | "COMPLETED";

export interface EnterpriseAcceptedRequestListFiltersDto {
  search?: string;
  status?: EnterpriseAcceptedRequestStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface GetEnterpriseAcceptedRequestsDto {
  userId: string;
  filter: EnterpriseAcceptedRequestListFiltersDto;
}

export interface EnterpriseAcceptedRequestListItemDto {
  id: string;
  quotationId: string;
  productName: string;
  status: EnterpriseAcceptedRequestStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  description: string;
  acceptedAt: Date;
}

export interface PaginatedEnterpriseAcceptedRequestsDto {
  items: EnterpriseAcceptedRequestListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
