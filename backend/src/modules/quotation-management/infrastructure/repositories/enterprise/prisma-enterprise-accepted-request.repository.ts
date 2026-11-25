import { Prisma } from "../../../../../../generated/prisma/client";
import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";
import { EnterpriseAcceptedRequestListFiltersDto, EnterpriseAcceptedRequestStatus, PaginatedEnterpriseAcceptedRequestsDto } from "../../../application/dto/enterprise/enterprise-accepted-request-list.dto";
import { IEnterpriseAcceptedRequestRepository } from "../../../domain/repositories/enterprise/enterprise-accepted-request.repository";
import { enterpriseAcceptedRequestListItemSelect, EnterpriseAcceptedRequestListMapper } from "../../mappers/enterprise/enterprise-accepted-request-list.mapper";


const ACCEPTED_STATUSES: EnterpriseAcceptedRequestStatus[] = ["ACCEPTED", "PAID", "COMPLETED"];

export class PrismaEnterpriseAcceptedRequestRepository implements IEnterpriseAcceptedRequestRepository {
  findById = async (id: string) => {
    return await prisma.proposals.findUnique({
      where: { id },
      select: { id: true },
    });
  };

  findEnterpriseIdByUserId = async (userId: string): Promise<string | null> => {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { enterprise_id: true },
    });
    return user?.enterprise_id ?? null;
  };

  findAcceptedRequests = async (enterpriseId: string,filter: EnterpriseAcceptedRequestListFiltersDto): Promise<PaginatedEnterpriseAcceptedRequestsDto> => {
    const DEFAULT_LIMIT = 9;
    const { search, limit, page, status } = filter;
    const pageSize = limit || DEFAULT_LIMIT;
    const currentPage = page || 1;


    const where: Prisma.proposalsWhereInput = {
      enterprise_id: enterpriseId,
      status: status && status !== "ALL" ? status : { in: ACCEPTED_STATUSES },
      ...(search
        ? {
            quotation: {
              product_name: { contains: search, mode: "insensitive" },
            },
          }
        : {}),
    };

    const [records, total] = await Promise.all([
      prisma.proposals.findMany({
        where,
        select: enterpriseAcceptedRequestListItemSelect,
        orderBy: { quotation: { accepted_at: "desc" } },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prisma.proposals.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: records.map(EnterpriseAcceptedRequestListMapper.toListItemDto),
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
    };
  };
}
