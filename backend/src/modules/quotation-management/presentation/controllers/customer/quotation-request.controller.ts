import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { CreateQuotationRequestDto, QuotationRequestDto } from "../../../application/dto/customer/quotation-request.dto";
import type { CreateQuotationRequestInput } from "../../validators/customer/create-quotation-request.schema";

export class QuotationRequestController {
    constructor(
        private readonly createQuotationRequestUseCase: IUseCase<CreateQuotationRequestDto, QuotationRequestDto>
    ) {}

    createQuotationRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const { productName, categoryId, subCategoryId, quantity, budget, location, description } = req.body as CreateQuotationRequestInput;

            const quotationRequest = await this.createQuotationRequestUseCase.execute({
                userId: userId!,
                productName,
                categoryId,
                subCategoryId,
                quantity,
                budget: budget ?? null,
                location: location ?? null,
                description,
            });

            sendResponse(res, "Quotation request created successfully", quotationRequest, HttpStatusCode.CREATED);
        } catch (error) {
            next(error);
        }
    };
}
