import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { CreateQuotationRequestDto } from "../../../application/dto/customer/quotation-request.dto";
import type { CreateQuotationRequestInput } from "../../validators/customer/create-quotation-request.schema";
import { GetQuotationRequestsDto, PaginatedQuotationDto, QuotationRequestStatus } from "../../../application/dto/customer/quotation-request-list.dto";

export class QuotationRequestController {
    constructor(
        private readonly createQuotationRequestUseCase: IUseCase<CreateQuotationRequestDto, void>,
        private readonly getQuotationRequestsUseCase: IUseCase<GetQuotationRequestsDto, PaginatedQuotationDto>
    ) {}

    createQuotationRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const { productName, categoryId, subCategoryId, quantity, budget, location, description } = req.body as CreateQuotationRequestInput;

            await this.createQuotationRequestUseCase.execute({
                userId: userId!,
                productName,
                categoryId,
                subCategoryId,
                quantity,
                budget: budget ?? null,
                location: location ?? null,
                description,
            });

            sendResponse(res, "Quotation request created successfully", undefined, HttpStatusCode.CREATED);
        } catch (error) {
            next(error);
        }
    };

    getQuotationRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const quotationRequest = await this.getQuotationRequestsUseCase.execute({
                userId: userId!,
                filter: {
                    search: req.query.search as string | undefined,
                    status: req.query.status as QuotationRequestStatus | "ALL" | undefined,
                    categoryId: req.query.categoryId as string | undefined,
                    page: Number(req.query.page ?? 1),
                    limit: Number(req.query.limit ?? 9),
                },
            });

            sendResponse(res, "Quotation requests retrieved successfully", quotationRequest, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };
}
