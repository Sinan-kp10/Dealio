import { EnterpriseQuotationStatus } from "./enterprise-quotation-list.dto";
import { EnterpriseProposalDetailsDto } from "./enterprise-proposal.dto";

export interface EnterpriseQuotationDetailsDto {
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
    status: EnterpriseQuotationStatus;
    createdAt: Date;
    proposal: EnterpriseProposalDetailsDto | null;
}

export interface GetEnterpriseQuotationDetailsDto {
    userId: string;
    quotationId: string;
}
