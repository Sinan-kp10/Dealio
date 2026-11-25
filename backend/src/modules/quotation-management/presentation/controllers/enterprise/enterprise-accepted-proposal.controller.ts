import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import {EnterpriseAcceptedProposalDetailsDto,GetEnterpriseAcceptedProposalDetailsDto} from "../../../application/dto/enterprise/enterprise-accepted-proposal-details.dto";
import {EnterpriseAcceptedProposalQuotationDetailsDto,GetEnterpriseAcceptedProposalQuotationDetailsDto} from "../../../application/dto/enterprise/enterprise-accepted-proposal-quotation-details.dto";
import {EnterpriseAcceptedProposalStatus,GetEnterpriseAcceptedProposalsDto,PaginatedEnterpriseAcceptedProposalsDto} from "../../../application/dto/enterprise/enterprise-accepted-proposal-list.dto";

export class EnterpriseAcceptedProposalController {
  constructor(
    private readonly getAcceptedProposalsUseCase: IUseCase<GetEnterpriseAcceptedProposalsDto,PaginatedEnterpriseAcceptedProposalsDto>,
    private readonly getAcceptedProposalDetailsUseCase: IUseCase<GetEnterpriseAcceptedProposalDetailsDto,EnterpriseAcceptedProposalDetailsDto>,
    private readonly getAcceptedProposalQuotationDetailsUseCase: IUseCase<GetEnterpriseAcceptedProposalQuotationDetailsDto,EnterpriseAcceptedProposalQuotationDetailsDto>
  ) {}

  getAcceptedProposals = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const { search, status, page, limit } = req.query;

      const acceptedProposals = await this.getAcceptedProposalsUseCase.execute({
        userId: userId!,
        filter: {
          search: search as string | undefined,
          status: status
            ? (status as EnterpriseAcceptedProposalStatus | "ALL")
            : undefined,
          page: page ? Number(page) : undefined,
          limit: limit ? Number(limit) : undefined,
        },
      });

      sendResponse(res,"Accepted proposals retrieved successfully",acceptedProposals,HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };

  getAcceptedProposalDetails = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const proposalId = req.params.proposalId as string;

      const proposalDetails = await this.getAcceptedProposalDetailsUseCase.execute({
        userId: userId!,
        proposalId,
      });

      sendResponse(res,"Accepted proposal details retrieved successfully",proposalDetails,HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };

  getAcceptedProposalQuotationDetails = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const proposalId = req.params.proposalId as string;

      const details = await this.getAcceptedProposalQuotationDetailsUseCase.execute({
        userId: userId!,
        proposalId,
      });

      sendResponse(res,"Accepted proposal quotation details retrieved successfully",details,HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };
}
