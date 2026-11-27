import type { EnterpriseProposalDetails } from "./enterprise-proposal.types";
import type { AvailableQuotationStatus } from "./enterprise-available-quotation.types";

export interface AvailableQuotationDetails {
  id: string;
  customerId: string;
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
  createdAt: string;
  proposal: EnterpriseProposalDetails | null;
}

export interface AvailableQuotationDetailsResponse {
  success: boolean;
  message: string;
  data: AvailableQuotationDetails;
}
