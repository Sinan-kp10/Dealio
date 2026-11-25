import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import {EnterpriseAcceptedRequestStatus,GetEnterpriseAcceptedRequestsDto,PaginatedEnterpriseAcceptedRequestsDto,} from "../../../application/dto/enterprise/enterprise-accepted-request-list.dto";

export class EnterpriseAcceptedRequestController {
  constructor(
    private readonly getAcceptedRequestsUseCase: IUseCase<GetEnterpriseAcceptedRequestsDto,PaginatedEnterpriseAcceptedRequestsDto>
  ) {}

  getAcceptedRequests = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const { search, status, page, limit } = req.query;

      const acceptedRequests = await this.getAcceptedRequestsUseCase.execute({
        userId: userId!,
        filter: {
          search: search as string | undefined,
          status: status ? (status as EnterpriseAcceptedRequestStatus | "ALL") : undefined,
          page: page ? Number(page) : undefined,
          limit: limit ? Number(limit) : undefined,
        },
      });
      sendResponse(res,"Accepted requests retrieved successfully",acceptedRequests,HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };
}
