import { Prisma } from "../../../../../../generated/prisma/client";
import { ReceivedProposalWithQuotationDto, ProposalStatus } from "../../../application/dto/customer/customer-received-proposal.dto";

export const receivedProposalWithQuotationSelect = {
    id: true,
    quotation_id: true,
    enterprise_id: true,
    status: true,
    quotation: {
        select: {
            customer_id: true,
            product_name: true,
            status: true,
        },
    },
} satisfies Prisma.proposalsSelect;

export type ReceivedProposalWithQuotationRecord = Prisma.proposalsGetPayload<{ select: typeof receivedProposalWithQuotationSelect }>;

export class ReceivedProposalWithQuotationMapper {
    static toDto(data: ReceivedProposalWithQuotationRecord): ReceivedProposalWithQuotationDto {
        return {
            id: data.id,
            quotationId: data.quotation_id,
            enterpriseId: data.enterprise_id,
            status: data.status as ProposalStatus,
            customerId: data.quotation.customer_id,
            productName: data.quotation.product_name,
            quotationStatus: data.quotation.status,
        };
    }
}
