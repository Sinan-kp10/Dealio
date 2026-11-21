import type { EnterpriseQuotationStatus } from "./enterprise-quotation.types";

export type EnterpriseProposalStatus = "PENDING" | "ACCEPTED" | "PAY_ADVANCE" | "COMPLETED" | "REJECTED";

export interface EnterpriseProposalDetails {
  id: string;
  itemName: string;
  unitPrice: number;
  totalAmount: number;
  description: string | null;
  termsAndConditions: string;
  status: EnterpriseProposalStatus;
  createdAt: string;
}

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
