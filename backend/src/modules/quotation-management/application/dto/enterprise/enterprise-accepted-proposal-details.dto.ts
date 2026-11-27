import { EnterpriseAcceptedProposalStatus } from "./enterprise-accepted-proposal-list.dto";

export interface EnterpriseAcceptedProposalDetailsDto {
  id: string;
  quotationId: string;
  customerId: string;
  productName: string;
  status: EnterpriseAcceptedProposalStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerPaidAmount: number;
  enterprisePayoutAmount: number;
  customer: {
    name: string;
  };
  acceptedAt: Date;
  paidAt: Date | null;
  completedAt: Date | null;
}

export interface GetEnterpriseAcceptedProposalDetailsDto {
  userId: string;
  proposalId: string;
}
