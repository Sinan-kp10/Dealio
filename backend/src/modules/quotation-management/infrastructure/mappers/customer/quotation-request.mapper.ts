import { Prisma } from "../../../../../../generated/prisma/client";
import { QuotationRequestListItemDto, QuotationRequestStatus } from "../../../application/dto/customer/quotation-request-list.dto";

export const quotationRequestListItemSelect = {
    id: true,
    product_name: true,
    quantity: true,
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
    proposals: {
        where: {
            status: { in: ["ACCEPTED", "PAID", "COMPLETED"] },
        },
        select: {
            enterprise_id: true,
        },
        take: 1,
    },
} satisfies Prisma.quotation_requestsSelect;

export type QuotationRequestListItemRecord = Prisma.quotation_requestsGetPayload<{ select: typeof quotationRequestListItemSelect }>;

export class QuotationRequestMapper {
  static toListItemDto(data: QuotationRequestListItemRecord): QuotationRequestListItemDto {
    return {
      id: data.id,
      productName: data.product_name,
      category: {
        id: data.category.id,
        name: data.category.name,
      },
      subCategory: {
        id: data.subcategory.id,
        name: data.subcategory.name,
      },
      quantity: data.quantity,
      description: data.description,
      status: data.status as QuotationRequestStatus,
      createdAt: data.created_at,
      acceptedEnterpriseId: data.proposals[0]?.enterprise_id ?? null,
    };
  }
}
