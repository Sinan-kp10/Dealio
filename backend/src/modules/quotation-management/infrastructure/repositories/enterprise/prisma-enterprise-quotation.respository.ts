import { Prisma } from "../../../../../../generated/prisma/client";
import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";
import { AvailableQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-available-quotation-details.dto";
import { AvailableQuotationListFiltersDto, PaginatedAvailableQuotationsDto } from "../../../application/dto/enterprise/enterprise-available-quotation-list.dto";
import { IEnterpriseQuotationRepository } from "../../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { CustomerQuotationDetailsMapper, customerQuotationDetailsSelect, enterpriseProposalDetailsSelect } from "../../mappers/enterprise/customer-quotation-details.mapper";
import { enterpriseQuotationListItemSelect, EnterpriseQuotationListMapper } from "../../mappers/enterprise/enterprise-quotation-list.mapper";


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

  findAvailableQuotations = async (enterpriseId: string, filter: AvailableQuotationListFiltersDto): Promise<PaginatedAvailableQuotationsDto> => {
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

  findQuotationDetails = async (enterpriseId: string, quotationId: string): Promise<AvailableQuotationDetailsDto | null> => {
    const [record, proposal] = await Promise.all([
      prisma.enterprise_quotation_requests.findFirst({
        where: {
          enterprise_id: enterpriseId,
          quotation_id: quotationId,
        },
        select: customerQuotationDetailsSelect,
      }),
      prisma.proposals.findFirst({
        where: {
          quotation_id: quotationId,
          enterprise_id: enterpriseId,
          status: {
            not: "WITHDRAWN",
          },
        },
        orderBy: {
          created_at: "desc",
        },
        select: enterpriseProposalDetailsSelect,
      }),
    ]);

    return record ? CustomerQuotationDetailsMapper.toDetailsDto(record, proposal) : null;
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
