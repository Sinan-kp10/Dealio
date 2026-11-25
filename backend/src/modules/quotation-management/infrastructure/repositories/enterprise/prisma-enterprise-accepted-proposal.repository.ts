import { Prisma } from "../../../../../../generated/prisma/client";
import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";
import { EnterpriseAcceptedProposalDetailsDto } from "../../../application/dto/enterprise/enterprise-accepted-proposal-details.dto";
import { EnterpriseAcceptedProposalQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-accepted-proposal-quotation-details.dto";
import {EnterpriseAcceptedProposalListFiltersDto,EnterpriseAcceptedProposalStatus,PaginatedEnterpriseAcceptedProposalsDto,} from "../../../application/dto/enterprise/enterprise-accepted-proposal-list.dto";
import { IEnterpriseAcceptedProposalRepository } from "../../../domain/repositories/enterprise/enterprise-accepted-proposal.repository";
import {enterpriseAcceptedProposalDetailsSelect,EnterpriseAcceptedProposalDetailsMapper,} from "../../mappers/enterprise/enterprise-accepted-proposal-details.mapper";
import {enterpriseAcceptedProposalListItemSelect,EnterpriseAcceptedProposalListMapper,} from "../../mappers/enterprise/enterprise-accepted-proposal-list.mapper";
import {enterpriseAcceptedProposalQuotationDetailsSelect,EnterpriseAcceptedProposalQuotationDetailsMapper,} from "../../mappers/enterprise/enterprise-accepted-proposal-quotation-details.mapper";

const ACCEPTED_STATUSES: EnterpriseAcceptedProposalStatus[] = ["ACCEPTED", "PAID", "COMPLETED"];

export class PrismaEnterpriseAcceptedProposalRepository implements IEnterpriseAcceptedProposalRepository {
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

  findAcceptedProposals = async (enterpriseId: string,filter: EnterpriseAcceptedProposalListFiltersDto): Promise<PaginatedEnterpriseAcceptedProposalsDto> => {
    const DEFAULT_LIMIT = 9;
    const { search, limit, page, status } = filter;
    const pageSize = limit || DEFAULT_LIMIT;
    const currentPage = page || 1;
    const trimmedSearch = search?.trim();

    const where: Prisma.proposalsWhereInput = {
      enterprise_id: enterpriseId,
      status: status && status !== "ALL" ? status : { in: ACCEPTED_STATUSES },
      ...(trimmedSearch
        ? {
            quotation: {
              product_name: { contains: trimmedSearch, mode: "insensitive" },
            },
          }
        : {}),
    };

    const [records, total] = await Promise.all([
      prisma.proposals.findMany({
        where,
        select: enterpriseAcceptedProposalListItemSelect,
        orderBy: { quotation: { accepted_at: "desc" } },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prisma.proposals.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: records.map(EnterpriseAcceptedProposalListMapper.toListItemDto),
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
    };
  };

  findAcceptedProposalDetails = async (enterpriseId: string,proposalId: string): Promise<EnterpriseAcceptedProposalDetailsDto | null> => {
    const record = await prisma.proposals.findFirst({
      where: {
        id: proposalId,
        enterprise_id: enterpriseId,
        status: { in: ACCEPTED_STATUSES },
      },
      select: enterpriseAcceptedProposalDetailsSelect,
    });

    return record ? EnterpriseAcceptedProposalDetailsMapper.toDetailsDto(record) : null;
  };

  findAcceptedProposalQuotationDetails = async (enterpriseId: string, proposalId: string): Promise<EnterpriseAcceptedProposalQuotationDetailsDto | null> => {
    const record = await prisma.proposals.findFirst({
      where: {
        id: proposalId,
        enterprise_id: enterpriseId,
        status: { in: ACCEPTED_STATUSES },
      },
      select: enterpriseAcceptedProposalQuotationDetailsSelect,
    });

    return record ? EnterpriseAcceptedProposalQuotationDetailsMapper.toDto(record) : null;
  };
}
