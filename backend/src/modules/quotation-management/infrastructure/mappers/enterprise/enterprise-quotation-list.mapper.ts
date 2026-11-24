import { Prisma } from "../../../../../../generated/prisma/client";
import { AvailableQuotationDto } from "../../../application/dto/enterprise/enterprise-available-quotation-list.dto";

export const enterpriseQuotationListItemSelect = {
  id: true,
  quotation_id: true,
  status: true,
  created_at: true,
  quotation: {
    select: {
      product_name: true,
      quantity: true,
      description: true,
      subcategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} satisfies Prisma.enterprise_quotation_requestsSelect;

export type EnterpriseQuotationListItemRecord = Prisma.enterprise_quotation_requestsGetPayload<{select: typeof enterpriseQuotationListItemSelect}>;

export class EnterpriseQuotationListMapper {
  static toListItemDto(data: EnterpriseQuotationListItemRecord): AvailableQuotationDto {
    return {
      id: data.quotation_id,
      productName: data.quotation.product_name,
      subCategory: {
        id: data.quotation.subcategory.id,
        name: data.quotation.subcategory.name,
      },
      quantity: data.quotation.quantity,
      description: data.quotation.description,
      status: data.status,
      createdAt: data.created_at,
    };
  }
}

