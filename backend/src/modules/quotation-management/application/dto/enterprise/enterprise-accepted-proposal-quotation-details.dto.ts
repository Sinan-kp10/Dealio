import { EnterpriseProposalDetailsDto } from "./enterprise-proposal.dto";

export interface AcceptedQuotationSnapshotDto {
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
  createdAt: Date;
}

export interface EnterpriseAcceptedProposalQuotationDetailsDto {
  quotation: AcceptedQuotationSnapshotDto;
  proposal: EnterpriseProposalDetailsDto;
}

export interface GetEnterpriseAcceptedProposalQuotationDetailsDto {
  userId: string;
  proposalId: string;
}
