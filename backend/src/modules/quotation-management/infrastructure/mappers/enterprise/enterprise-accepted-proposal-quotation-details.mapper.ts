import { Prisma } from "../../../../../../generated/prisma/client";
import { EnterpriseAcceptedProposalQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-accepted-proposal-quotation-details.dto";

export const enterpriseAcceptedProposalQuotationDetailsSelect = {
  id: true,
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
  quotation: {
    select: {
      id: true,
      product_name: true,
      quantity: true,
      budget: true,
      location: true,
      description: true,
      status: true,
      created_at: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      subcategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} satisfies Prisma.proposalsSelect;

export type EnterpriseAcceptedProposalQuotationDetailsRecord = Prisma.proposalsGetPayload<{ select: typeof enterpriseAcceptedProposalQuotationDetailsSelect }>;

export class EnterpriseAcceptedProposalQuotationDetailsMapper {
  static toDto(data: EnterpriseAcceptedProposalQuotationDetailsRecord): EnterpriseAcceptedProposalQuotationDetailsDto {
    return {
      quotation: {
        id: data.quotation.id,
        productName: data.quotation.product_name,
        category: {
          id: data.quotation.category.id,
          name: data.quotation.category.name,
        },
        subCategory: {
          id: data.quotation.subcategory.id,
          name: data.quotation.subcategory.name,
        },
        quantity: data.quotation.quantity,
        budget: data.quotation.budget,
        location: data.quotation.location,
        description: data.quotation.description,
        status: data.quotation.status,
        createdAt: data.quotation.created_at,
      },
      proposal: {
        id: data.id,
        itemName: data.item_name,
        description: data.description,
        quantity: data.quantity,
        unitPrice: Number(data.unit_price),
        totalAmount: Number(data.total_amount),
        deliveryTimeline: data.delivery_timeline,
        warrantyCoverage: data.warranty_coverage,
        replacementPolicy: data.replacement_policy,
        additionalNotes: data.additional_notes,
        status: data.status,
        createdAt: data.created_at,
      },
    };
  }
}
