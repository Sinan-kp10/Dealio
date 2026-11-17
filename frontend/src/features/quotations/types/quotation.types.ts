export type QuotationRequestStatus =
    | 'PENDING'
    | 'PROPOSAL_RECEIVED'
    | 'ACCEPTED'
    | 'COMPLETED'
    | 'CANCELLED';

export interface CreateQuotationRequestPayload {
    productName: string;
    categoryId: string;
    subCategoryId: string;
    quantity: number;
    budget?: number | null;
    location?: string | null;
    description: string;
}

export interface CreateQuotationResponse {
    success: boolean;
    message: string;
}

export interface QuotationRequestListItem {
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
    createdAt: string;
}

export interface QuotationListParams {
    search?: string;
    status?: QuotationRequestStatus | 'ALL';
    categoryId?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedQuotations {
    items: QuotationRequestListItem[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface QuotationListResponse {
    success: boolean;
    message: string;
    data: PaginatedQuotations;
}
