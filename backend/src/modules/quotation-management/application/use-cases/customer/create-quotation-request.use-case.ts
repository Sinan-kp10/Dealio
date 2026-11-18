import { IUseCase } from "../../../../../shared/application/base.usecase";
import { CreateQuotationRequestDto } from "../../dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";

export class CreateQuotationRequestUseCase implements IUseCase<CreateQuotationRequestDto, void> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (input: CreateQuotationRequestDto): Promise<void> => {

        await this.quotationRequestRepository.createQuatationRequest(input);
    };
}
