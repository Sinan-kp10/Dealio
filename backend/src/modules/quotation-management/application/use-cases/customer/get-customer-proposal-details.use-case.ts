import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { ICustomerProposalRepository } from "../../../domain/repositories/customer/customer-proposal.repository";
import { CustomerProposalDetailsDto, GetCustomerProposalDetailsInputDto } from "../../dto/customer/customer-proposal-details.dto";

export class GetCustomerProposalDetailsUseCase implements IUseCase<GetCustomerProposalDetailsInputDto, CustomerProposalDetailsDto> {
    constructor(
        private readonly customerProposalRepository: ICustomerProposalRepository
    ) {}

    execute = async (input: GetCustomerProposalDetailsInputDto): Promise<CustomerProposalDetailsDto> => {
        const proposal = await this.customerProposalRepository.findProposalDetails(
            input.proposalId,
            input.quotationId,
            input.userId
        );

        if (!proposal) {
            throw new NotFoundError("Proposal not found");
        }

        return proposal;
    };
}
