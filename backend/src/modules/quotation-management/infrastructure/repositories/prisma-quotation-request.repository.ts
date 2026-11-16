import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { CreateQuotationRequestDto, QuotationRequestDto} from "../../application/dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../domain/repositories/customer/quotation.request.repository";
import { QuotationRequestMapper, quotationRequestSelect } from "../mappers/customer/quotation-request.mapper";

export class PrismaQuotationRequestRepository implements IQuotationRequestRepository {
    findById= async (id: string): Promise<boolean> => {
        const user = await prisma.users.findUnique({
            where : {id}
        })

        return user !== null 
    }

    createQuatationRequest = async (data: CreateQuotationRequestDto): Promise<QuotationRequestDto> => {
        const quotatioRequest = await prisma.quotation_requests.create({
            data : {
                customer_id : data.userId,
                product_name : data.productName,
                category_id : data.category.id,
                subcategory_id : data.subCategory.id,
                quantity : data.quantity,
                budget : data.budget,
                location : data.location,
                description : data.description
            },
            select : quotationRequestSelect
        })

        return QuotationRequestMapper.toDto(quotatioRequest)
    }
}