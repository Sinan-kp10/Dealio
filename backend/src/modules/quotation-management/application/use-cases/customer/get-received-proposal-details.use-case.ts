import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { ICustomerProposalRepository } from "../../../domain/repositories/customer/customer-proposal.repository";
import { ReceivedProposalDetailsDto, GetReceivedProposalDetailsInputDto } from "../../dto/customer/received-proposal-details.dto";

export class GetReceivedProposalDetailsUseCase implements IUseCase<GetReceivedProposalDetailsInputDto, ReceivedProposalDetailsDto> {
    constructor(
        private readonly customerProposalRepository: ICustomerProposalRepository
    ) {}

    execute = async (input: GetReceivedProposalDetailsInputDto): Promise<ReceivedProposalDetailsDto> => {
        const proposal = await this.customerProposalRepository.findReceivedProposalDetails(
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
