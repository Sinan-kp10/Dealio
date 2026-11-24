import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import {
    CreateProposalInputDto,
    ProposalStatus,
    ProposalWithQuotationInfoDto,
    QuotationBasicInfoDto,
} from "../../application/dto/enterprise/enterprise-proposal.dto";
import { IEnterpriseProposalRepository } from "../../domain/repositories/enterprise/enterprise-proposal.repository";

export class PrismaEnterpriseProposalRepository implements IEnterpriseProposalRepository {
    findById = async (id: string): Promise<ProposalWithQuotationInfoDto | null> => {
        const proposal = await prisma.proposals.findUnique({
            where: { id },
            select: {
                status: true,
                enterprise_id: true,
                quotation: {
                    select: {
                        status: true,
                    },
                },
            },
        });
        return proposal
            ? {
                status: proposal.status as ProposalStatus,
                enterpriseId: proposal.enterprise_id,
                quotationStatus: proposal.quotation.status,
              }
            : null;
    };

    findEnterpriseIdByUserId = async (userId: string): Promise<string | null> => {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { enterprise_id: true },
        });
        return user?.enterprise_id ?? null;
    };

    findQuotationById = async (quotationId: string): Promise<QuotationBasicInfoDto | null> => {
        const quotation = await prisma.quotation_requests.findUnique({
            where: { id: quotationId },
            select: { customer_id: true, product_name: true, status: true },
        });
        return quotation
            ? {
                customerId: quotation.customer_id,
                productName: quotation.product_name,
                status: quotation.status,
              }
            : null;
    };

    findProposalByQuotationAndEnterprise = async (quotationId: string, enterpriseId: string): Promise<{ id: string } | null> => {
        const proposal = await prisma.proposals.findFirst({
            where: {
                quotation_id: quotationId,
                enterprise_id: enterpriseId,
                status: {
                    not: "WITHDRAWN",
                },
            },
            select: { id: true },
        });
        return proposal;
    };

    createEnterpriseProposal = async (enterpriseId: string, data: CreateProposalInputDto, totalAmount: number): Promise<void> => {
        await prisma.$transaction(async (tx) => {
            await tx.proposals.create({
                data: {
                    quotation_id: data.quotationId,
                    enterprise_id: enterpriseId,
                    item_name: data.itemName,
                    description: data.description,
                    delivery_timeline: data.deliveryTimeline,
                    warranty_coverage: data.warrantyCoverage,
                    replacement_policy: data.replacementPolicy,
                    additional_notes: data.additionalNotes,
                    quantity: data.quantity,
                    unit_price: data.unitPrice,
                    total_amount: totalAmount,
                },
            });

            await tx.enterprise_quotation_requests.updateMany({
                where: {
                    enterprise_id: enterpriseId,
                    quotation_id: data.quotationId,
                },
                data: {
                    status: "PROPOSAL_SENT",
                },
            });

            await tx.quotation_requests.updateMany({
                where: {
                    id: data.quotationId,
                    status: "PENDING",
                },
                data: {
                    status: "PROPOSAL_RECEIVED",
                },
            });
        });
    };

    withdrawProposal = async (proposalId: string, enterpriseId: string): Promise<void> => {
        await prisma.$transaction(async (tx) => {
            const updated = await tx.proposals.update({
                where: { id: proposalId },
                data: {
                    status: "WITHDRAWN",
                },
                select: {
                    quotation_id: true,
                },
            });

            await tx.enterprise_quotation_requests.updateMany({
                where: {
                    enterprise_id: enterpriseId,
                    quotation_id: updated.quotation_id,
                },
                data: {
                    status: "OPEN",
                },
            });
        });
    };
}
