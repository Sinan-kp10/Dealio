import type { EnterpriseProposalDetails } from "./enterprise-proposal.types";
import type { EnterpriseQuotationStatus } from "./enterprise-quotation.types";

export interface EnterpriseQuotationDetails {
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
  createdAt: string;
  proposal: EnterpriseProposalDetails | null;
}

export interface EnterpriseQuotationDetailsResponse {
  success: boolean;
  message: string;
  data: EnterpriseQuotationDetails;
}
