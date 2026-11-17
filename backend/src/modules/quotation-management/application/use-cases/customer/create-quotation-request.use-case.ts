import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { CreateQuotationRequestDto } from "../../dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";

export class CreateQuotationRequestUseCase implements IUseCase<CreateQuotationRequestDto, void> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository
    ) {}

    execute = async (input: CreateQuotationRequestDto): Promise<void> => {
        const userExists = await this.quotationRequestRepository.findById(input.userId);
        if (!userExists) {
            throw new NotFoundError("Customer not found");
        }

        await this.quotationRequestRepository.createQuatationRequest(input);
    };
}
