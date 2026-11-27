export type AcceptedProposalStatus = "ACCEPTED" | "PAID" | "COMPLETED";

export interface EnterpriseAcceptedProposalListItem {
  id: string;
  quotationId: string;
  customerId: string;
  productName: string;
  status: AcceptedProposalStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  description: string;
  acceptedAt: string;
}

export interface EnterpriseAcceptedProposalParams {
  search?: string;
  status?: AcceptedProposalStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface PaginatedEnterpriseAcceptedProposals {
  items: EnterpriseAcceptedProposalListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EnterpriseAcceptedProposalsResponse {
  success: boolean;
  message: string;
  data: PaginatedEnterpriseAcceptedProposals;
}
