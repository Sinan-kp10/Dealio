import { Prisma } from "../../../../../../generated/prisma/client";
import { CustomerReceivedProposalItemDto, ProposalStatus } from "../../../application/dto/customer/customer-received-proposal.dto";

export const customerProposalListItemSelect = {
    id: true,
    quotation_id: true,
    item_name: true,
    description: true,
    quantity: true,
    unit_price: true,
    total_amount: true,
    delivery_timeline: true,
    warranty_coverage: true,
    replacement_policy: true,
    additional_notes: true,
    status: true,
    created_at: true,
    enterprise: {
        select: {
            id: true,
            enterprise_name: true,
        },
    },
} satisfies Prisma.proposalsSelect;

export type CustomerProposalListItemRecord = Prisma.proposalsGetPayload<{ select: typeof customerProposalListItemSelect }>;

export class CustomerProposalMapper {
    static toItemDto(data: CustomerProposalListItemRecord): CustomerReceivedProposalItemDto {
        return {
            id: data.id,
            quotationId: data.quotation_id,
            enterprise: {
                id: data.enterprise.id,
                name: data.enterprise.enterprise_name,
            },
            itemName: data.item_name,
            description: data.description,
            quantity: data.quantity,
            unitPrice: Number(data.unit_price),
            totalAmount: Number(data.total_amount),
            deliveryTimeline: data.delivery_timeline,
            warrantyCoverage: data.warranty_coverage,
            replacementPolicy: data.replacement_policy,
            additionalNotes: data.additional_notes,
            status: data.status as ProposalStatus,
            createdAt: data.created_at,
        };
    }
}
