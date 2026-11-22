import { IUseCase } from "../../../../../shared/application/base.usecase";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";
import { QuotationRequestListItemDto } from "../../dto/customer/quotation-request-list.dto";

export class GetRecentQuotationRequestsUseCase implements IUseCase<string, QuotationRequestListItemDto[]> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (userId: string): Promise<QuotationRequestListItemDto[]> => {
        return await this.quotationRequestRepository.recentQuotationRequests(userId);
    };
}
