export type EnterpriseProposalStatus = "PENDING" | "ACCEPTED" | "PAID" | "COMPLETED" | "REJECTED" | "WITHDRAWN"

export interface EnterpriseProposalDetails {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryTimeline: string;
  warrantyCoverage: string;
  replacementPolicy: string;
  additionalNotes: string | null;
  status: EnterpriseProposalStatus;
  createdAt: string;
}

export interface CreateEnterpriseProposalPayload {
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  deliveryTimeline: string;
  warrantyCoverage: string;
  replacementPolicy: string;
  additionalNotes?: string | null;
}

export interface CreateEnterpriseProposalResponse {
  success: boolean;
  message: string;
}

export interface WithdrawEnterpriseProposalResponse {
  success: boolean;
  message: string;
}
