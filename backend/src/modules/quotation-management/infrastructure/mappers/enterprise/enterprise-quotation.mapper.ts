import { Prisma } from "../../../../../../generated/prisma/client";
import { QuotationRequestStatus } from "../../../application/dto/customer/quotation-request-list.dto";
import {EnterpriseQuotationListItemDto,} from "../../../application/dto/enterprise/enterprise-quotation-details.dto";

export const enterpriseQuotationListItemSelect = {
  id: true,
  product_name: true,
  quantity: true,
  budget: true,
  location: true,
  description: true,
  status: true,
  created_at: true,
  subcategory: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.quotation_requestsSelect;

export type EnterpriseQuotationListItemRecord = Prisma.quotation_requestsGetPayload<{select: typeof enterpriseQuotationListItemSelect;}>;

export class EnterpriseQuotationMapper {
  static toListItemDto(data: EnterpriseQuotationListItemRecord): EnterpriseQuotationListItemDto {
    return {
      id: data.id,
      productName: data.product_name,
      subCategory: {
        id: data.subcategory.id,
        name: data.subcategory.name,
      },
      quantity: data.quantity,
      budget: data.budget,
      location: data.location,
      description: data.description,
      status: data.status as QuotationRequestStatus,
      createdAt: data.created_at,
    };
  }
}
