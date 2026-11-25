import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { GetReceivedProposalsDto, PaginatedCustomerReceivedProposalsDto, AcceptReceivedProposalInputDto } from "../../../application/dto/customer/customer-received-proposal.dto";
import { ReceivedProposalDetailsDto, GetReceivedProposalDetailsInputDto } from "../../../application/dto/customer/received-proposal-details.dto";

export class CustomerProposalController {
    constructor(
        private readonly getReceivedProposalsUseCase: IUseCase<GetReceivedProposalsDto, PaginatedCustomerReceivedProposalsDto>,
        private readonly getReceivedProposalDetailsUseCase: IUseCase<GetReceivedProposalDetailsInputDto, ReceivedProposalDetailsDto>,
        private readonly acceptReceivedProposalUseCase: IUseCase<AcceptReceivedProposalInputDto, void>
    ) {}

    getReceivedProposals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const quotationId = req.params.quotationId as string;

            const proposals = await this.getReceivedProposalsUseCase.execute({
                userId: userId!,
                quotationId,
                query: {
                    search: req.query.search as string | undefined,
                    page: req.query.page ? Number(req.query.page) : undefined,
                    limit: req.query.limit ? Number(req.query.limit) : undefined,
                },
            });

            sendResponse(res, "Received proposals retrieved successfully", proposals, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };

    getReceivedProposalDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const quotationId = req.params.quotationId as string;
            const proposalId = req.params.proposalId as string;

            const proposal = await this.getReceivedProposalDetailsUseCase.execute({
                userId: userId!,
                quotationId,
                proposalId,
            });

            sendResponse(res, "Received proposal details retrieved successfully", proposal, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };

    acceptReceivedProposal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const quotationId = req.params.quotationId as string;
            const proposalId = req.params.proposalId as string;

            await this.acceptReceivedProposalUseCase.execute({
                userId: userId!,
                quotationId,
                proposalId,
            });

            sendResponse(res, "Proposal accepted successfully", null, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };
}
