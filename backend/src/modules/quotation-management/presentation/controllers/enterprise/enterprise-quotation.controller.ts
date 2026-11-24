import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { EnterpriseQuotationListFiltersDto, PaginatedQuotationDto, MarkNotInterestedDto, GetEnterpriseQuotationsDto, EnterpriseQuotationStatus } from "../../../application/dto/enterprise/enterprise-quotation-list.dto";
import { CustomerQuotationDetailsDto, GetCustomerQuotationDetailsDto } from "../../../application/dto/enterprise/customer-quotation-details.dto";

export class EnterpriseQuotationController {
  constructor(
    private readonly getAvailableQuotationsUseCase: IUseCase<GetEnterpriseQuotationsDto,PaginatedQuotationDto>,
    private readonly markNotInterestedUseCase: IUseCase<MarkNotInterestedDto, void>,
    private readonly getCustomerQuotationDetailsUseCase: IUseCase<GetCustomerQuotationDetailsDto, CustomerQuotationDetailsDto>
  ) {}

  getAvailableQuotations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      const { search, status, page, limit } = req.query;

      const quotations = await this.getAvailableQuotationsUseCase.execute({
        userId: userId!,
        filter: {
          search: search as string,
          status: status ? (status as EnterpriseQuotationStatus | "ALL") : undefined,
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

      sendResponse(res, "Quotation marked as not interested", null, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  };
}
