export type EnterpriseAcceptedProposalStatus = "ACCEPTED" | "PAID" | "COMPLETED";

export interface EnterpriseAcceptedProposalListFiltersDto {
  search?: string;
  status?: EnterpriseAcceptedProposalStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface GetEnterpriseAcceptedProposalsDto {
  userId: string;
  filter: EnterpriseAcceptedProposalListFiltersDto;
}

export interface EnterpriseAcceptedProposalListItemDto {
  id: string;
  quotationId: string;
  customerId: string;
  productName: string;
  status: EnterpriseAcceptedProposalStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  description: string;
  acceptedAt: Date;
}

export interface PaginatedEnterpriseAcceptedProposalsDto {
  items: EnterpriseAcceptedProposalListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
