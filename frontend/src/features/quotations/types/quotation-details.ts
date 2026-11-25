import type { QuotationRequestStatus } from "./quotation.types";

export interface QuotationDetails {
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
    budget: number | null;
    location: string | null;
    description: string;
    status: QuotationRequestStatus;
    createdAt: string;
    acceptedAt?: string | null;
    cancelledAt?: string | null;
    paidAt?: string | null;
    completedAt?: string | null;
}

export interface QuotationDetailsResponse {
    success: boolean;
    message: string;
    data: QuotationDetails;
}
