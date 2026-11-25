import { Prisma } from "../../../../../../generated/prisma/client";
import { EnterpriseProposalDetailsDto } from "../../../application/dto/enterprise/enterprise-proposal.dto";
import { AvailableQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-available-quotation-details.dto";

export const customerQuotationDetailsSelect = {
  id: true,
  quotation_id: true,
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
} satisfies Prisma.enterprise_quotation_requestsSelect;

export const enterpriseProposalDetailsSelect = {
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
} satisfies Prisma.proposalsSelect;

export type CustomerQuotationDetailsRecord = Prisma.enterprise_quotation_requestsGetPayload<{select: typeof customerQuotationDetailsSelect}>;
export type EnterpriseProposalDetailsRecord = Prisma.proposalsGetPayload<{select: typeof enterpriseProposalDetailsSelect}>;

export class CustomerQuotationDetailsMapper {
  static toProposalDto(proposal: EnterpriseProposalDetailsRecord): EnterpriseProposalDetailsDto {
    return {
      id: proposal.id,
      itemName: proposal.item_name,
      description: proposal.description,
      quantity: proposal.quantity,
      unitPrice: Number(proposal.unit_price),
      totalAmount: Number(proposal.total_amount),
      deliveryTimeline: proposal.delivery_timeline,
      warrantyCoverage: proposal.warranty_coverage,
      replacementPolicy: proposal.replacement_policy,
      additionalNotes: proposal.additional_notes,
      status: proposal.status,
      createdAt: proposal.created_at,
    };
  }

  static toDetailsDto(data: CustomerQuotationDetailsRecord, proposal?: EnterpriseProposalDetailsRecord | null): AvailableQuotationDetailsDto {
    return {
      id: data.quotation_id,
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
      status: data.status,
      createdAt: data.created_at,
      proposal: proposal ? CustomerQuotationDetailsMapper.toProposalDto(proposal) : null,
    };
  }
}
