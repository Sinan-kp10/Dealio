export interface CreateQuotationRequestDto {
    userId: string;
    productName: string;
    categoryId: string;
    subCategoryId: string;
    quantity: number;
    budget: number | null;
    location: string | null;
    description: string;
}
