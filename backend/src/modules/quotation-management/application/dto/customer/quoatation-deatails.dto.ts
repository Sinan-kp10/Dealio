import { QuotationRequestStatus } from "./quotation-request-list.dto";

export interface QuotationRequestDetailsDto {
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
    createdAt: Date;
}
