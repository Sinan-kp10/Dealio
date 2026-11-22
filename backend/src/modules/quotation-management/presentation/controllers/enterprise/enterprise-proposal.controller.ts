import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { CreateProposalInputDto } from "../../../application/dto/enterprise/enterprise-proposal.dto";

export class EnterpriseProposalController {
    constructor(
        private readonly createProposalUseCase: IUseCase<CreateProposalInputDto, void>
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
}
