import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { CreateProposalInputDto, ProposalStatus } from "../../application/dto/enterprise/enterprise-proposal.dto";
import { IEnterpriseProposalRepository } from "../../domain/repositories/enterprise/enterprise-proposal.repository";

export class PrismaEnterpriseProposalRepository implements IEnterpriseProposalRepository {
    findById = async (id: string): Promise<{ id: string; status: ProposalStatus } | null> => {
        const proposal = await prisma.proposals.findUnique({
            where: { id },
            select: {
                id: true,
                status: true,
            },
        });
        return proposal ? { id: proposal.id, status: proposal.status as ProposalStatus } : null;
    };

    findEnterpriseIdByUserId = async (userId: string): Promise<string | null> => {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { enterprise_id: true },
        });
        return user?.enterprise_id ?? null;
    };

    findQuotationById = async (quotationId: string): Promise<boolean> => {
        const quotation = await prisma.quotation_requests.findUnique({
            where: { id: quotationId },
            select: { id: true },
        });
        return quotation !== null;
    };

    findProposalByQuotationAndEnterprise = async (quotationId: string, enterpriseId: string): Promise<{ id: string } | null> => {
        const proposal = await prisma.proposals.findUnique({
            where: {
                quotation_id_enterprise_id: {
                    quotation_id: quotationId,
                    enterprise_id: enterpriseId,
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
}
