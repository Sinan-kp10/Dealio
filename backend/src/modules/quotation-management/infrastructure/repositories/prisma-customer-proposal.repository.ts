import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { Prisma } from "../../../../../generated/prisma/client";
import { ICustomerProposalRepository } from "../../domain/repositories/customer/customer-proposal.repository";
import { GetReceivedProposalsQueryDto, PaginatedCustomerReceivedProposalsDto, ReceivedProposalWithQuotationDto } from "../../application/dto/customer/customer-received-proposal.dto";
import { ReceivedProposalDetailsDto } from "../../application/dto/customer/received-proposal-details.dto";
import { customerProposalListItemSelect, customerProposalDetailsSelect, CustomerProposalMapper } from "../mappers/customer/customer-proposal.mapper";
import { receivedProposalWithQuotationSelect, ReceivedProposalWithQuotationMapper } from "../mappers/customer/received-proposal-with-quotation.mapper";

export class PrismaCustomerProposalRepository implements ICustomerProposalRepository {
    findById = async (id: string): Promise<ReceivedProposalWithQuotationDto | null> => {
        const proposal = await prisma.proposals.findFirst({
            where: {
                id,
                status: { not: "WITHDRAWN" },
            },
            select: receivedProposalWithQuotationSelect,
        });
        return proposal ? ReceivedProposalWithQuotationMapper.toDto(proposal) : null;
    };

    findProposalsByQuotationId = async (quotationId: string,userId: string,query: GetReceivedProposalsQueryDto): Promise<PaginatedCustomerReceivedProposalsDto> => {
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

    findReceivedProposalDetails = async (proposalId: string,quotationId: string,userId: string): Promise<ReceivedProposalDetailsDto | null> => {
        const proposal = await prisma.proposals.findFirst({
            where: {
                id: proposalId,
                quotation_id: quotationId,
                quotation: {
                    customer_id: userId,
                },
                status: { not: "WITHDRAWN" },
            },
            select: customerProposalDetailsSelect,
        });

        return proposal ? CustomerProposalMapper.toDetailsDto(proposal) : null;
    };

    acceptReceivedProposal = async (proposalId: string, quotationId: string, enterpriseId: string): Promise<string | null> => {
        return await prisma.$transaction(async (tx) => {
            await tx.proposals.update({
                where: { id: proposalId },
                data: {
                    status: "ACCEPTED",
                },
            });

            await tx.proposals.updateMany({
                where: {
                    quotation_id: quotationId,
                    id: { not: proposalId },
                    status: "PENDING",
                },
                data: {
                    status: "REJECTED",
                },
            });

            await tx.quotation_requests.update({
                where: { id: quotationId },
                data: {
                    status: "ACCEPTED",
                    accepted_at: new Date(),
                },
            });

            await tx.enterprise_quotation_requests.updateMany({
                where: { quotation_id: quotationId },
                data: {
                    status: "CLOSED",
                },
            });

            const manager = await tx.users.findFirst({
                where: {
                    enterprise_id: enterpriseId,
                    role: "ENTERPRISE_MANAGER",
                },
                select: {
                    id: true,
                },
            });

            return manager?.id ?? null;
        });
    };
}
