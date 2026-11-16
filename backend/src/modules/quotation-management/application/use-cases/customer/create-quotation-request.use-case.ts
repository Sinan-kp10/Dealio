import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { CreateQuotationRequestDto, QuotationRequestDto } from "../../dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";

export class CreateQuotationRequestUseCase implements IUseCase<CreateQuotationRequestDto, QuotationRequestDto> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (input: CreateQuotationRequestDto): Promise<QuotationRequestDto> => {
        const userExists = await this.quotationRequestRepository.findById(input.userId);
        if (!userExists) {
            throw new NotFoundError("Customer not found");
        }

        return await this.quotationRequestRepository.createQuatationRequest(input);
    };
}
