import { Prisma } from "../../../../../generated/prisma/client";
import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { EnterpriseQuotationListFiltersDto, PaginatedQuotationDto } from "../../application/dto/enterprise/enterprise-quotation-details.dto";
import { IEnterpriseQuotationRepository } from "../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { EnterpriseQuotationMapper, enterpriseQuotationListItemSelect } from "../mappers/enterprise/enterprise-quotation.mapper";

export class PrismaEnterpriseQuotationRepository implements IEnterpriseQuotationRepository {
  findById = async (id: string) => {
    return await prisma.quotation_requests.findUnique({
      where: { id },
    });
  };

  findEnterpriseIdByUserId = async (userId: string): Promise<string | null> => {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { enterprise_id: true },
    });
    return user?.enterprise_id || null;
  };

  findAvailableQuotations = async (enterpriseId: string, filter: EnterpriseQuotationListFiltersDto): Promise<PaginatedQuotationDto> => {
    const DEFAULT_LIMIT = 9;
    const { search, limit, page, subcategoryId, status } = filter;
    const pageSize = limit || DEFAULT_LIMIT;
    const currentPage = page || 1;

    const where: Prisma.enterprise_quotation_requestsWhereInput = {
      enterprise_id: enterpriseId,
      ...(status && status !== "ALL" ? { status } : {}),
      ...(subcategoryId && subcategoryId !== "ALL" ? { quotation: { subcategory_id: subcategoryId } } : {}),
      ...(search ? { quotation: { product_name: { contains: search, mode: "insensitive" } } } : {}),
    };

    const [records, total] = await Promise.all([
      prisma.enterprise_quotation_requests.findMany({
        where,
        select: enterpriseQuotationListItemSelect,
        orderBy: { created_at: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prisma.enterprise_quotation_requests.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: records.map(EnterpriseQuotationMapper.toListItemDto),
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
    };
  };

  markNotInterested = async (enterpriseId: string, quotationId: string): Promise<void> => {
    await prisma.enterprise_quotation_requests.deleteMany({
      where: {
        enterprise_id: enterpriseId,
        quotation_id: quotationId,
      },
    });
  };
}
