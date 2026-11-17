import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { QuotationListFiltersDto, PaginatedQuotationDto } from "../../../application/dto/customer/quotation-request-list.dto";
import { CreateQuotationRequestDto } from "../../../application/dto/customer/quotation-request.dto";

export interface IQuotationRequestRepository extends IBaseRepository<boolean> {
    createQuatationRequest(data: CreateQuotationRequestDto): Promise<void>;
    findQuotationRequest(userId: string, filter: QuotationListFiltersDto): Promise<PaginatedQuotationDto>;
}
