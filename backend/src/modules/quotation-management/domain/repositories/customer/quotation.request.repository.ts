import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { QuotationRequestDto, CreateQuotationRequestDto } from "../../../application/dto/customer/quotation-request.dto";

export interface IQuotationRequestRepository extends IBaseRepository<boolean> {
    createQuatationRequest(data : CreateQuotationRequestDto) : Promise<QuotationRequestDto>
}