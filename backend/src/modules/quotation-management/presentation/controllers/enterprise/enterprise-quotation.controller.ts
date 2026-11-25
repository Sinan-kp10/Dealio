import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { AvailableQuotationListFiltersDto, PaginatedAvailableQuotationsDto, MarkNotInterestedDto, GetAvailableQuotationsDto, AvailableQuotationStatus } from "../../../application/dto/enterprise/enterprise-available-quotation-list.dto";
import { AvailableQuotationDetailsDto, GetAvailableQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-available-quotation-details.dto";

export class EnterpriseQuotationController {
  constructor(
    private readonly getAvailableQuotationsUseCase: IUseCase<GetAvailableQuotationsDto, PaginatedAvailableQuotationsDto>,
    private readonly markNotInterestedUseCase: IUseCase<MarkNotInterestedDto, void>,
    private readonly getCustomerQuotationDetailsUseCase: IUseCase<GetAvailableQuotationDetailsDto, AvailableQuotationDetailsDto>
  ) {}

  getAvailableQuotations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const { search, status, page, limit } = req.query;

      const quotations = await this.getAvailableQuotationsUseCase.execute({
        userId: userId!,
        filter: {
          search: search as string,
          status: status ? (status as AvailableQuotationStatus | "ALL") : undefined,
          page: page ? Number(page) : undefined,
          limit: limit ? Number(limit) : undefined,
        },
      });

      sendResponse(res, "Available quotations retrieved successfully", quotations, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };

  getQuotationDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const quotationId = req.params.quotationId as string;

      const quotation = await this.getCustomerQuotationDetailsUseCase.execute({
        userId: userId!,
        quotationId,
      });

      sendResponse(res, "Quotation details retrieved successfully", quotation, HttpStatusCode.OK);
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

      sendResponse(res, "Quotation marked as not interested successfully", null, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };
}
