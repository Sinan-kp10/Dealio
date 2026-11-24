import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { CreateProposalInputDto, WithdrawProposalDto } from "../../../application/dto/enterprise/enterprise-proposal.dto";

export class EnterpriseProposalController {
    constructor(
        private readonly createProposalUseCase: IUseCase<CreateProposalInputDto, void>,
        private readonly withdrawProposalUseCase: IUseCase<WithdrawProposalDto, void>
    ) {}

    createProposal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const quotationId = req.params.quotationId as string;
            const {
                itemName,
                description,
                quantity,
                unitPrice,
                deliveryTimeline,
                warrantyCoverage,
                replacementPolicy,
                additionalNotes,
            } = req.body;

            await this.createProposalUseCase.execute({
                userId: userId!,
                quotationId,
                itemName,
                description,
                quantity,
                unitPrice,
                deliveryTimeline,
                warrantyCoverage,
                replacementPolicy,
                additionalNotes,
            });

            sendResponse(res, "Proposal submitted successfully", null, HttpStatusCode.CREATED);
        } catch (error) {
            next(error);
        }
    };

    withdrawProposal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const proposalId = req.params.proposalId as string;

            await this.withdrawProposalUseCase.execute({
                userId: userId!,
                proposalId,
            });

            sendResponse(res, "Proposal withdrawn successfully", null, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };
}
