import { Prisma } from "../../../../../../generated/prisma/client";
import {
  EnterpriseAcceptedProposalListItemDto,
  EnterpriseAcceptedProposalStatus,
} from "../../../application/dto/enterprise/enterprise-accepted-proposal-list.dto";

export const enterpriseAcceptedProposalListItemSelect = {
  id: true,
  quotation_id: true,
  quantity: true,
  unit_price: true,
  total_amount: true,
  delivery_timeline: true,
  status: true,
  updated_at: true,
  quotation: {
    select: {
      customer_id: true,
      product_name: true,
      description: true,
      accepted_at: true,
    },
  },
} satisfies Prisma.proposalsSelect;

export type EnterpriseAcceptedProposalListItemRecord = Prisma.proposalsGetPayload<{select: typeof enterpriseAcceptedProposalListItemSelect;}>;

export class EnterpriseAcceptedProposalListMapper {
  static toListItemDto(data: EnterpriseAcceptedProposalListItemRecord): EnterpriseAcceptedProposalListItemDto {
    return {
      id: data.id,
      quotationId: data.quotation_id,
      customerId: data.quotation.customer_id,
      productName: data.quotation.product_name,
      status: data.status as EnterpriseAcceptedProposalStatus,
      quantity: data.quantity,
      unitPrice: Number(data.unit_price),
      totalAmount: Number(data.total_amount),
      deliveryTimeline: data.delivery_timeline,
      description: data.quotation.description,
      acceptedAt: data.quotation.accepted_at ?? data.updated_at,
    };
  }
}
