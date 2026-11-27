export type AvailableQuotationStatus = "OPEN" | "PROPOSAL_SENT" | "CLOSED" | "CANCELLED";

export interface AvailableQuotationListFiltersDto {
    search?: string;
    status?: AvailableQuotationStatus | "ALL";
    page?: number;
    limit?: number;
}

export interface GetAvailableQuotationsDto {
    userId: string;
    filter: AvailableQuotationListFiltersDto;
}

export interface MarkNotInterestedDto {
    userId: string;
    quotationId: string;
}

export interface AvailableQuotationDto {
    id: string;
    customerId: string;
    productName: string;
    subCategory: {
        id: string;
        name: string;
    };
    quantity: number;
    description: string;
    status: AvailableQuotationStatus;
    createdAt: Date;
}

export interface PaginatedAvailableQuotationsDto {
    items: AvailableQuotationDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
