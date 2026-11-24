export type ProposalStatus = "PENDING" | "ACCEPTED" | "PAY_ADVANCE" | "COMPLETED" | "REJECTED" | "WITHDRAWN";

export interface QuotationBasicInfoDto {
    id: string;
    customerId: string;
    productName: string;
}

export interface EnterpriseProposalDetailsDto {
    id: string;
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

export interface CreateProposalInputDto {
    userId: string;
    quotationId: string;
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    deliveryTimeline: string;
    warrantyCoverage: string;
    replacementPolicy: string;
    additionalNotes?: string | null;
}

export interface WithdrawProposalDto {
    userId: string;
    proposalId: string;
}
