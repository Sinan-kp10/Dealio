import { QuotationRequestStatus } from "../customer/quotation-request-list.dto";

export interface EnterpriseQuotationListFiltersDto {
    search?: string;
    subcategoryId?: string;
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
    budget: number | null;
    location: string | null;
    description: string;
    status: QuotationRequestStatus;
    createdAt: Date;
}

export interface PaginatedQuotationDto {
    items: EnterpriseQuotationListItemDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}