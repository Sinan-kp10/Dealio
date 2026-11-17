import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { Prisma, quotation_request_status } from "../../../../../generated/prisma/client";
import { CreateQuotationRequestDto } from "../../application/dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../domain/repositories/customer/quotation.request.repository";
import { QuotationRequestMapper, quotationRequestListItemSelect } from "../mappers/customer/quotation-request.mapper";
import { PaginatedQuotationDto, QuotationListFiltersDto } from "../../application/dto/customer/quotation-request-list.dto";

export class PrismaQuotationRequestRepository implements IQuotationRequestRepository {

    findById = async (id: string): Promise<boolean> => {
        const user = await prisma.users.findUnique({
            where: { id },
            select: { id: true },
        });

        return user !== null;
    };

    createQuatationRequest = async (data: CreateQuotationRequestDto): Promise<void> => {
        await prisma.quotation_requests.create({
            data: {
                customer_id: data.userId,
                product_name: data.productName,
                category_id: data.categoryId,
                subcategory_id: data.subCategoryId,
                quantity: data.quantity,
                budget: data.budget,
                location: data.location,
                description: data.description,
            },
        });
    };

    findQuotationRequest = async (userId: string, filter: QuotationListFiltersDto): Promise<PaginatedQuotationDto> => {
        const DEFAULT_LIMIT = 9;
        const { search, limit, page, status, categoryId } = filter;
        const pageSize = limit || DEFAULT_LIMIT;
        const currentPage = page || 1;

        const where: Prisma.quotation_requestsWhereInput = {
            customer_id: userId,
            ...(status && status !== "ALL" ? { status: status as quotation_request_status } : {}),
            ...(categoryId ? { category_id: categoryId } : {}),
            ...(search
                ? {
                    OR: [
                        { product_name: { contains: search, mode: "insensitive" } },
                        { description: { contains: search, mode: "insensitive" } },
                        { category: { name: { contains: search, mode: "insensitive" } } },
                        { subcategory: { name: { contains: search, mode: "insensitive" } } },
                    ],
                }
                : {}),
        };

        const [records, total] = await Promise.all([
            prisma.quotation_requests.findMany({
                where,
                select: quotationRequestListItemSelect,
                orderBy: { created_at: "desc" },
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
            }),
            prisma.quotation_requests.count({ where }),
        ]);

        const totalPages = Math.ceil(total / pageSize);

        return {
            items: records.map(QuotationRequestMapper.toListItemDto),
            page: currentPage,
            limit: pageSize,
            total,
            totalPages,
        };
    };
}
