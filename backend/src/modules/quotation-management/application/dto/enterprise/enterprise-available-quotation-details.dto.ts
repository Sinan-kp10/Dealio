import { AvailableQuotationStatus } from "./enterprise-available-quotation-list.dto";
import { EnterpriseProposalDetailsDto } from "./enterprise-proposal.dto";

export interface AvailableQuotationDetailsDto {
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
    status: AvailableQuotationStatus;
    createdAt: Date;
    proposal: EnterpriseProposalDetailsDto | null;
}

export interface GetAvailableQuotationDetailsDto {
    userId: string;
    quotationId: string;
}
