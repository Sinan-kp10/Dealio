import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";
import { QuotationRequestDetailsDto } from "../../dto/customer/quoatation-deatails.dto";

export class GetQuotationRequestDetailsUseCase implements IUseCase<string, QuotationRequestDetailsDto> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (quotationId: string): Promise<QuotationRequestDetailsDto> => {
        const quotationRequest = await this.quotationRequestRepository.findQuotationRequestDetails(quotationId);

        if (!quotationRequest) {
            throw new NotFoundError("Quotation request not found");
        }

        return quotationRequest;
    };
}
