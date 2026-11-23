import { IUseCase } from "../../../../../shared/application/base.usecase";
import { ICustomerProposalRepository } from "../../../domain/repositories/customer/customer-proposal.repository";
import { GetReceivedProposalsDto, PaginatedCustomerReceivedProposalsDto } from "../../dto/customer/customer-received-proposal.dto";

export class GetReceivedProposalsUseCase implements IUseCase<GetReceivedProposalsDto, PaginatedCustomerReceivedProposalsDto> {
    constructor(
        private readonly customerProposalRepository: ICustomerProposalRepository
    ) {}

    execute = async (input: GetReceivedProposalsDto): Promise<PaginatedCustomerReceivedProposalsDto> => {
        return await this.customerProposalRepository.findProposalsByQuotationId(
            input.quotationId,
            input.userId,
            input.query
        );
    };
}
