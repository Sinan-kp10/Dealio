export type EnterpriseQuotationStatus = "OPEN" | "PROPOSAL_SENT" | "CLOSED" | "CANCELLED";
export type ProposalStatus = "PENDING" | "ACCEPTED" | "PAY_ADVANCE" | "COMPLETED" | "REJECTED";

export interface EnterpriseQuotationListFiltersDto {
    search?: string;
    status?: EnterpriseQuotationStatus | "ALL";
    page?: number;
    limit?: number;
}

export interface GetEnterpriseQuotationsDto {
    userId: string;
    filter: EnterpriseQuotationListFiltersDto;
}

export interface MarkNotInterestedDto {
    userId: string;
    quotationId: string;
}

export interface EnterpriseQuotationListItemDto {
    id: string;
    productName: string;
    subCategory: {
        id: string;
        name: string;
    };
    quantity: number;
    description: string;
    status: EnterpriseQuotationStatus;
    createdAt: Date;
}

export interface PaginatedQuotationDto {
    items: EnterpriseQuotationListItemDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}