import { Prisma } from "../../../../../../generated/prisma/client";
import {EnterpriseAcceptedRequestListItemDto,EnterpriseAcceptedRequestStatus,} from "../../../application/dto/enterprise/enterprise-accepted-request-list.dto";

export const enterpriseAcceptedRequestListItemSelect = {
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
      product_name: true,
      description: true,
      accepted_at: true,
    },
  },
} satisfies Prisma.proposalsSelect;

export type EnterpriseAcceptedRequestListItemRecord = Prisma.proposalsGetPayload<{select: typeof enterpriseAcceptedRequestListItemSelect}>;

export class EnterpriseAcceptedRequestListMapper {
  static toListItemDto(data: EnterpriseAcceptedRequestListItemRecord): EnterpriseAcceptedRequestListItemDto {
    return {
      id: data.id,
      quotationId: data.quotation_id,
      productName: data.quotation.product_name,
      status: data.status as EnterpriseAcceptedRequestStatus,
      quantity: data.quantity,
      unitPrice: Number(data.unit_price),
      totalAmount: Number(data.total_amount),
      deliveryTimeline: data.delivery_timeline,
      description: data.quotation.description,
      acceptedAt: data.quotation.accepted_at ?? data.updated_at,
    };
  }
}
