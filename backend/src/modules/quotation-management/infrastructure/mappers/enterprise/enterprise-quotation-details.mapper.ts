import { Prisma } from "../../../../../../generated/prisma/client";
import { EnterpriseProposalDetailsDto } from "../../../application/dto/enterprise/enterprise-proposal.dto";
import { EnterpriseQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-quotation-details.dto";

export const enterpriseQuotationDetailsSelect = {
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
  unit_price: true,
  total_amount: true,
  description: true,
  terms_and_conditions: true,
  status: true,
  created_at: true,
} satisfies Prisma.proposalsSelect;

export type EnterpriseQuotationDetailsRecord = Prisma.enterprise_quotation_requestsGetPayload<{select: typeof enterpriseQuotationDetailsSelect}>;
export type EnterpriseProposalDetailsRecord = Prisma.proposalsGetPayload<{select: typeof enterpriseProposalDetailsSelect}>;

export class EnterpriseQuotationDetailsMapper {
  static toProposalDto(proposal: EnterpriseProposalDetailsRecord): EnterpriseProposalDetailsDto {
    return {
      id: proposal.id,
      itemName: proposal.item_name,
      unitPrice: Number(proposal.unit_price),
      totalAmount: Number(proposal.total_amount),
      description: proposal.description,
      termsAndConditions: proposal.terms_and_conditions,
      status: proposal.status,
      createdAt: proposal.created_at,
    };
  }

  static toDetailsDto(data: EnterpriseQuotationDetailsRecord, proposal?: EnterpriseProposalDetailsRecord | null): EnterpriseQuotationDetailsDto {
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
      proposal: proposal ? EnterpriseQuotationDetailsMapper.toProposalDto(proposal) : null,
    };
  }
}
