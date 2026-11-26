export type QuotationRequestStatus = 'PENDING' | 'PROPOSAL_RECEIVED' | 'ACCEPTED' | 'PAID' | 'COMPLETED' | 'CANCELLED';

export interface QuotationListFiltersDto {
    search?: string;
    status?: QuotationRequestStatus | 'ALL';
    categoryId?: string;
    page?: number;
    limit?: number;
}

export interface GetQuotationRequestsDto {
    userId: string;
    filter: QuotationListFiltersDto;
}

export interface QuotationRequestListItemDto {
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
    description: string;
    status: QuotationRequestStatus;
    createdAt: Date;
    acceptedEnterpriseId: string | null;
}

export interface PaginatedQuotationDto {
    items: QuotationRequestListItemDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
