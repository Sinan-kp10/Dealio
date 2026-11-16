import { Prisma } from "../../../../../../generated/prisma/client";
import { QuotationRequestDto } from "../../../application/dto/customer/quotation-request.dto";

export const quotationRequestSelect = {
    product_name : true,
    category : true,
    subcategory : true,
    quantity : true,
    budget : true,
    location : true,
    description : true,
    status : true,
    created_at : true
} satisfies Prisma.quotation_requestsSelect;

export type quotationRequestRecord = Prisma.quotation_requestsGetPayload<{ select: typeof quotationRequestSelect }>;

export class QuotationRequestMapper {
  static toDto( data : quotationRequestRecord): QuotationRequestDto {
    return {
        productName : data.product_name,
        category : data.category,
        subCategory : data.subcategory,
        quantity : data.quantity,
        budget : data.budget,
        location : data.location,
        description : data.description,
        status : data.status,
        createdAt : data.created_at
    };
  }
}
