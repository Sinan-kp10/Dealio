export interface QuotationCategory {
    id: string;
    name: string;
}

export interface QuotationSubCategory {
    id: string;
    name: string;
}

export interface CreateQuotationRequestPayload {
    productName: string;
    categoryId: string;
    subCategoryId: string;
    quantity: number;
    budget?: number | null;
    location?: string | null;
    description: string;
}

export interface QuotationRequestDto {
    productName: string;
    category: QuotationCategory;
    subCategory: QuotationSubCategory;
    quantity: number;
    budget: number | null;
    location: string | null;
    description: string;
    status: string;
    createdAt: string;
}

export interface CreateQuotationResponse {
    success: boolean;
    message: string;
    data: QuotationRequestDto;
}
