import type { AcceptedProposalStatus } from "./enterprise-accepted-proposal.types";
import type { EnterpriseProposalDetails } from "./enterprise-proposal.types";

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

export interface AcceptedQuotationSnapshot {
  id: string;
  productName: string;
  category: {
    id: string;
    name: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
  quantity: number;
  budget: number | null;
  location: string | null;
  description: string;
  status: string;
  createdAt: string;
}

export interface EnterpriseAcceptedProposalQuotationDetails {
  quotation: AcceptedQuotationSnapshot;
  proposal: EnterpriseProposalDetails;
}

export interface EnterpriseAcceptedProposalQuotationDetailsResponse {
  success: boolean;
  message: string;
  data: EnterpriseAcceptedProposalQuotationDetails;
}
