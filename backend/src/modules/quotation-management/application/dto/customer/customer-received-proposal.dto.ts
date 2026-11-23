export type ProposalStatus = "PENDING" | "ACCEPTED" | "PAY_ADVANCE" | "COMPLETED" | "REJECTED";

export interface CustomerReceivedProposalItemDto {
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
    warrantyCoverage: string;
    replacementPolicy: string;
    additionalNotes?: string | null;
    status: ProposalStatus;
    createdAt: Date;
}

export interface GetReceivedProposalsQueryDto {
    search?: string;
    page?: number;
    limit?: number;
}

export interface GetReceivedProposalsDto {
    userId: string;
    quotationId: string;
    query: GetReceivedProposalsQueryDto;
}

export interface PaginatedCustomerReceivedProposalsDto {
    items: CustomerReceivedProposalItemDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
