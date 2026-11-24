import { ProposalStatus } from "./customer-received-proposal.dto";

export interface CustomerProposalEnterpriseDto {
    id: string;
    name: string;
}

export interface CustomerProposalDetailsDto {
    id: string;
    quotationId: string;
    enterprise: CustomerProposalEnterpriseDto;
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    deliveryTimeline: string;
    warrantyCoverage: string;
    replacementPolicy: string;
    additionalNotes?: string | null;
    status: ProposalStatus;
    createdAt: Date;
}

export interface GetCustomerProposalDetailsInputDto {
    userId: string;
    proposalId: string;
    quotationId: string;
}
