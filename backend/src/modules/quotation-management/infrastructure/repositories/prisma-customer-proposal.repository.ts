import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { Prisma } from "../../../../../generated/prisma/client";
import { ICustomerProposalRepository } from "../../domain/repositories/customer/customer-proposal.repository";
import { GetReceivedProposalsQueryDto, PaginatedCustomerReceivedProposalsDto, ProposalStatus } from "../../application/dto/customer/customer-received-proposal.dto";
import { customerProposalListItemSelect, CustomerProposalMapper } from "../mappers/customer/customer-proposal.mapper";

export class PrismaCustomerProposalRepository implements ICustomerProposalRepository {
    findById = async (id: string): Promise<{ id: string; status: ProposalStatus } | null> => {
        const proposal = await prisma.proposals.findFirst({
            where: {
                id,
                status: { not: "WITHDRAWN" },
            },
            select: {
                id: true,
                status: true,
            },
        });
        return proposal ? { id: proposal.id, status: proposal.status as ProposalStatus } : null;
    };

    findProposalsByQuotationId = async(quotationId: string,userId: string,query: GetReceivedProposalsQueryDto): Promise<PaginatedCustomerReceivedProposalsDto> => {
        const DEFAULT_LIMIT = 6;
        const { search, limit, page } = query;
        const pageSize = limit || DEFAULT_LIMIT;
        const currentPage = page || 1;

        const where: Prisma.proposalsWhereInput = {
            quotation_id: quotationId,
            quotation: { customer_id: userId },
            status: { not: "WITHDRAWN" },
            ...(search
                ? {
                    OR: [
                        { enterprise: { enterprise_name: { contains: search, mode: "insensitive" } } },
                        { item_name: { contains: search, mode: "insensitive" } },
                    ],
                }
                : {}),
        };

        const [records, total] = await Promise.all([
            prisma.proposals.findMany({
                where,
                select: customerProposalListItemSelect,
                orderBy: { created_at: "desc" },
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
            }),
            prisma.proposals.count({ where }),
        ]);

        const totalPages = Math.ceil(total / pageSize);

        return {
            items: records.map(CustomerProposalMapper.toItemDto),
            page: currentPage,
            limit: pageSize,
            total,
            totalPages,
        };
    };
}
