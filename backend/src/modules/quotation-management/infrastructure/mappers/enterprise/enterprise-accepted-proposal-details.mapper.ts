import { Prisma } from "../../../../../../generated/prisma/client";
import { EnterpriseAcceptedProposalDetailsDto } from "../../../application/dto/enterprise/enterprise-accepted-proposal-details.dto";
import { EnterpriseAcceptedProposalStatus } from "../../../application/dto/enterprise/enterprise-accepted-proposal-list.dto";

export const enterpriseAcceptedProposalDetailsSelect = {
  id: true,
  quotation_id: true,
  quantity: true,
  unit_price: true,
  total_amount: true,
  status: true,
  updated_at: true,
  quotation: {
    select: {
      product_name: true,
      accepted_at: true,
      paid_at: true,
      completed_at: true,
      customer: {
        select: {
          name: true,
        },
      },
    },
  },
} satisfies Prisma.proposalsSelect;

export type EnterpriseAcceptedProposalDetailsRecord = Prisma.proposalsGetPayload<{select: typeof enterpriseAcceptedProposalDetailsSelect;}>;

export class EnterpriseAcceptedProposalDetailsMapper {
  static toDetailsDto(data: EnterpriseAcceptedProposalDetailsRecord): EnterpriseAcceptedProposalDetailsDto {
    const totalAmount = Number(data.total_amount);

    return {
      id: data.id,
      quotationId: data.quotation_id,
      productName: data.quotation.product_name,
      status: data.status as EnterpriseAcceptedProposalStatus,
      quantity: data.quantity,
      unitPrice: Number(data.unit_price),
      totalAmount,
      customerPaidAmount: data.status === "ACCEPTED" ? 0 : totalAmount,
      enterprisePayoutAmount: data.status === "COMPLETED" ? totalAmount : 0,
      customer: {
        name: data.quotation.customer.name,
      },
      acceptedAt: data.quotation.accepted_at ?? data.updated_at,
      paidAt: data.quotation.paid_at,
      completedAt: data.quotation.completed_at,
    };
  }
}
