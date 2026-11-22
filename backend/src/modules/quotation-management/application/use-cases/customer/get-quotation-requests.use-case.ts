import { IUseCase } from "../../../../../shared/application/base.usecase";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";
import { GetQuotationRequestsDto, PaginatedQuotationDto } from "../../dto/customer/quotation-request-list.dto";

export class GetQuotationRequestsUseCase implements IUseCase<GetQuotationRequestsDto, PaginatedQuotationDto> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (input: GetQuotationRequestsDto): Promise<PaginatedQuotationDto> => {
        return await this.quotationRequestRepository.findQuotationRequests(input.userId, input.filter);
    };
}
