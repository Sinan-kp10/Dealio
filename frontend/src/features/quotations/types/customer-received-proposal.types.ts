export type CustomerProposalStatus = "PENDING" | "ACCEPTED" | "PAY_ADVANCE" | "COMPLETED" | "REJECTED";

export interface CustomerReceivedProposal {
  id: string;
  quotationId: string;
  enterprise: {
    id: string;
    name: string;
  };
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  status: CustomerProposalStatus;
  createdAt: string;
}

export interface ReceivedProposalDetails {
  id: string;
  quotationId: string;
  quotationStatus: string;
  enterprise: {
    id: string;
    name: string;
  };
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  warrantyCoverage: string;
  replacementPolicy: string;
  additionalNotes?: string | null;
  status: CustomerProposalStatus;
  createdAt: string;
}

export interface GetReceivedProposalsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedCustomerReceivedProposals {
  items: CustomerReceivedProposal[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomerReceivedProposalsResponse {
  success: boolean;
  message: string;
  data: PaginatedCustomerReceivedProposals;
}

export interface ReceivedProposalDetailsResponse {
  success: boolean;
  message: string;
  data: ReceivedProposalDetails;
}
