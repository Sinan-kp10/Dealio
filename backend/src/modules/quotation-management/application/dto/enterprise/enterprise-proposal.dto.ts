export type ProposalStatus = "PENDING" | "ACCEPTED" | "PAY_ADVANCE" | "COMPLETED" | "REJECTED";

export interface EnterpriseProposalDetailsDto {
    id: string;
    itemName: string;
    unitPrice: number;
    totalAmount: number;
    description: string | null;
    termsAndConditions: string;
    status: ProposalStatus;
    createdAt: Date;
}

