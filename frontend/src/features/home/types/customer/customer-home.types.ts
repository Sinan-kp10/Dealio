export type CustomerQuotationStatus =
  | "PENDING"
  | "PROPOSAL_RECEIVED"
  | "ACCEPTED"
  | "PAID"
  | "COMPLETED"
  | "CANCELLED";

export interface CustomerRecentQuotationItem {
  id: string;
  productName: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
  quantity: number;
  status: CustomerQuotationStatus;
  createdAt: string;
  acceptedEnterpriseId?: string | null;
}

export interface CustomerRecentQuotationsResponse {
  message: string;
  data: CustomerRecentQuotationItem[];
}
