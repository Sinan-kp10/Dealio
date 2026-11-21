import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import {
  GetEnterpriseQuotationsDto,
  MarkNotInterestedDto,
  PaginatedQuotationDto,
} from "../../../application/dto/enterprise/enterprise-quotation-details.dto";

export class EnterpriseQuotationController {
  constructor(
    private readonly getAvailableQuotationsUseCase: IUseCase<GetEnterpriseQuotationsDto, PaginatedQuotationDto>,
    private readonly markNotInterestedUseCase: IUseCase<MarkNotInterestedDto, void>
  ) {}

  getAvailableQuotations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;

      const quotations = await this.getAvailableQuotationsUseCase.execute({
        userId: userId!,
        filter: {
          search: req.query.search as string | undefined,
          subcategoryId: req.query.subcategoryId as string | undefined,
          page: Number(req.query.page ?? 1),
          limit: Number(req.query.limit ?? 9),
        },
      });

      sendResponse(res, "Available quotations retrieved successfully", quotations, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };

  markNotInterested = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const quotationId = req.params.quotationId as string;

      await this.markNotInterestedUseCase.execute({
        userId: userId!,
        quotationId,
      });

      sendResponse(res, "Quotation marked as not interested successfully", undefined, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };
}
