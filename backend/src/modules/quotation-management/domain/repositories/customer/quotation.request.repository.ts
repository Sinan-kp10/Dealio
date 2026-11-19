import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { QuotationRequestDetailsDto } from "../../../application/dto/customer/quoatation-deatails.dto";
import { QuotationListFiltersDto, PaginatedQuotationDto, QuotationRequestStatus, QuotationRequestListItemDto} from "../../../application/dto/customer/quotation-request-list.dto";
import { CreateQuotationRequestDto } from "../../../application/dto/customer/quotation-request.dto";

export interface IQuotationRequestRepository extends IBaseRepository<{id : string , status : QuotationRequestStatus} | null> {
    createQuatationRequest(data: CreateQuotationRequestDto): Promise<void>;
    findQuotationRequests(userId: string, filter: QuotationListFiltersDto): Promise<PaginatedQuotationDto>;
    findQuotationRequestDetails(quoationId: string): Promise<QuotationRequestDetailsDto | null>;
    cancelQuotationRequest(quoationId : string) : Promise<void>
    recentQuotationRequests(userId: string): Promise<QuotationRequestListItemDto[]>;
}
