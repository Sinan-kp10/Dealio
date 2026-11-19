import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { Prisma, quotation_request_status } from "../../../../../generated/prisma/client";
import { CreateQuotationRequestDto } from "../../application/dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../domain/repositories/customer/quotation.request.repository";
import { QuotationRequestMapper, quotationRequestListItemSelect } from "../mappers/customer/quotation-request.mapper";
import { PaginatedQuotationDto, QuotationListFiltersDto, QuotationRequestListItemDto, QuotationRequestStatus } from "../../application/dto/customer/quotation-request-list.dto";
import { QuotationRequestDetailsDto } from "../../application/dto/customer/quoatation-deatails.dto";
import { QuotationRequestDetailsMapper, quotationRequestDetailsSelect } from "../mappers/customer/quoatation-reqeust.details.repository";

export class PrismaQuotationRequestRepository implements IQuotationRequestRepository {

    findById = async (id: string): Promise<{id : string , status : QuotationRequestStatus} | null> => {
        const quotationRequest = await prisma.quotation_requests.findUnique({
            where: { id },
            select: { id: true, status : true },
        });

        return quotationRequest ?? null

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

    findQuotationRequests = async (userId: string, filter: QuotationListFiltersDto): Promise<PaginatedQuotationDto> => {
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

    findQuotationRequestDetails = async (quoationId: string): Promise<QuotationRequestDetailsDto | null> => {
        const qotationRequestDetails = await prisma.quotation_requests.findUnique({
            where: { id: quoationId },
            select: quotationRequestDetailsSelect,
        });

        return qotationRequestDetails ? QuotationRequestDetailsMapper.toDto(qotationRequestDetails) : null;
    };

    cancelQuotationRequest = async (quoationId: string): Promise<void> => {
        await prisma.quotation_requests.update({
            where : {id : quoationId},
            data : {
                status : "CANCELLED",
                cancelled_at : new Date()
            }
        })
    }

    recentQuotationRequests = async (userId: string): Promise<QuotationRequestListItemDto[]> => {
        const limit = 3;

        const quotationRequests = await prisma.quotation_requests.findMany({
            where: {
                customer_id: userId,
                status: { not: "CANCELLED" },
            },
            select: quotationRequestListItemSelect,
            take: limit,
            orderBy: { created_at: "desc" },
        });

        return quotationRequests.map(QuotationRequestMapper.toListItemDto);
    };
}
