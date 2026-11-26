import { Prisma } from "../../../../../../generated/prisma/client";
import { QuotationRequestDetailsDto } from "../../../application/dto/customer/quoatation-deatails.dto";
import { QuotationRequestStatus } from "../../../application/dto/customer/quotation-request-list.dto";

export const quotationRequestDetailsSelect = {
    id: true,
    product_name: true,
    quantity: true,
    budget: true,
    location: true,
    description: true,
    status: true,
    created_at: true,
    cancelled_at: true,
    accepted_at: true,
    paid_at: true,
    completed_at: true,
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

export type QuotationRequestDetailsRecord = Prisma.quotation_requestsGetPayload<{ select: typeof quotationRequestDetailsSelect }>;

export class QuotationRequestDetailsMapper {
  static toDto(data: QuotationRequestDetailsRecord): QuotationRequestDetailsDto {
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
      budget: data.budget,
      location: data.location,
      description: data.description,
      status: data.status as QuotationRequestStatus,
      createdAt: data.created_at,
      acceptedAt: data.accepted_at,
      cancelledAt: data.cancelled_at,
      paidAt: data.paid_at,
      completedAt: data.completed_at,
      acceptedEnterpriseId: data.proposals[0]?.enterprise_id ?? null,
    };
  }
}
