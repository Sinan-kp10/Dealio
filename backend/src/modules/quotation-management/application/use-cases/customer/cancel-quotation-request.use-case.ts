import { IUseCase } from "../../../../../shared/application/base.usecase";
import { ConflictError, NotFoundError } from "../../../../../shared/errors/app-error";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";

export class CancelQuotationRequestUseCase implements IUseCase<string, void> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (quotionId: string): Promise<void> => {

        const quotationRequest = await this.quotationRequestRepository.findById(quotionId)

        if(!quotationRequest){
            throw new NotFoundError("Quotation request not found")
        }

        if(quotationRequest.status === "ACCEPTED" || quotationRequest.status === "PAID" || quotationRequest.status === "COMPLETED"){
            throw new ConflictError("This quotation request cannot be cancelled because it is already accepted or completed.")
        }

        await this.quotationRequestRepository.cancelQuotationRequest(quotionId)
    };
}
