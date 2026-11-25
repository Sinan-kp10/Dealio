import { ProposalStatus } from "./customer-received-proposal.dto";

export interface ReceivedProposalEnterpriseDto {
    id: string;
    name: string;
}

export interface ReceivedProposalDetailsDto {
    id: string;
    quotationId: string;
    quotationStatus: string;
    enterprise: ReceivedProposalEnterpriseDto;
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

export interface GetReceivedProposalDetailsInputDto {
    userId: string;
    proposalId: string;
    quotationId: string;
}
