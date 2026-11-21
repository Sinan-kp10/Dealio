import { Prisma } from "../../../../../generated/prisma/client";
import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { EnterpriseQuotationDetailsDto } from "../../application/dto/enterprise/enterprise-quotation-details.dto";
import { EnterpriseQuotationListFiltersDto, PaginatedQuotationDto } from "../../application/dto/enterprise/enterprise-quotation-list.dto";
import { IEnterpriseQuotationRepository } from "../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { EnterpriseQuotationDetailsMapper, enterpriseProposalDetailsSelect, enterpriseQuotationDetailsSelect } from "../mappers/enterprise/enterprise-quotation-details.mapper";
import { EnterpriseQuotationListMapper, enterpriseQuotationListItemSelect } from "../mappers/enterprise/enterprise-quotation-list.mapper";

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
    const { search, limit, page, status } = filter;
    const pageSize = limit || DEFAULT_LIMIT;
    const currentPage = page || 1;

    const where: Prisma.enterprise_quotation_requestsWhereInput = {
      enterprise_id: enterpriseId,
      ...(status && status !== "ALL" ? { status } : {}),
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
      items: records.map(EnterpriseQuotationListMapper.toListItemDto),
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
    };
  };

  findQuotationDetails = async (enterpriseId: string, quotationId: string): Promise<EnterpriseQuotationDetailsDto | null> => {
    const [record, proposal] = await Promise.all([
      prisma.enterprise_quotation_requests.findFirst({
        where: {
          enterprise_id: enterpriseId,
          quotation_id: quotationId,
          status: {
            notIn: ["CLOSED", "CANCELLED"],
          },
        },
        select: enterpriseQuotationDetailsSelect,
      }),
      prisma.proposals.findUnique({
        where: {
          quotation_id_enterprise_id: {
            quotation_id: quotationId,
            enterprise_id: enterpriseId,
          },
        },
        select: enterpriseProposalDetailsSelect,
      }),
    ]);

    if (!record) return null;

    return EnterpriseQuotationDetailsMapper.toDetailsDto(record, proposal);
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
