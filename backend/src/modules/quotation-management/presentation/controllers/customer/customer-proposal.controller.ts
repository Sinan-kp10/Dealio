import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { GetReceivedProposalsDto, PaginatedCustomerReceivedProposalsDto } from "../../../application/dto/customer/customer-received-proposal.dto";
import { CustomerProposalDetailsDto, GetCustomerProposalDetailsInputDto } from "../../../application/dto/customer/customer-proposal-details.dto";

export class CustomerProposalController {
    constructor(
        private readonly getReceivedProposalsUseCase: IUseCase<GetReceivedProposalsDto, PaginatedCustomerReceivedProposalsDto>,
        private readonly getCustomerProposalDetailsUseCase: IUseCase<GetCustomerProposalDetailsInputDto, CustomerProposalDetailsDto>
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

    getProposalDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const quotationId = req.params.quotationId as string;
            const proposalId = req.params.proposalId as string;

            const proposal = await this.getCustomerProposalDetailsUseCase.execute({
                userId: userId!,
                quotationId,
                proposalId,
            });

            sendResponse(res, "Proposal details retrieved successfully", proposal, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };
}
