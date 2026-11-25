import type { AcceptedProposalStatus } from "./enterprise-accepted-proposal.types";

export interface EnterpriseAcceptedProposalDetails {
  id: string;
  quotationId: string;
  productName: string;
  status: AcceptedProposalStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerPaidAmount: number;
  enterprisePayoutAmount: number;
  customer: {
    name: string;
  };
  acceptedAt: string;
  paidAt: string | null;
  completedAt: string | null;
}

export interface EnterpriseAcceptedProposalDetailsResponse {
  success: boolean;
  message: string;
  data: EnterpriseAcceptedProposalDetails;
}
