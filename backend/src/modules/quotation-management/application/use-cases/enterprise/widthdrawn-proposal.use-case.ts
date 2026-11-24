import { IUseCase } from "../../../../../shared/application/base.usecase";
import { BadRequestError, NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseProposalRepository } from "../../../domain/repositories/enterprise/enterprise-proposal.repository";
import { WithdrawProposalDto } from "../../dto/enterprise/enterprise-proposal.dto";

export class WithdrawnProposalUseCase implements IUseCase<WithdrawProposalDto, void> {
    constructor(
        private readonly enterpriseProposalRepository: IEnterpriseProposalRepository
    ) {}

    execute = async (input: WithdrawProposalDto): Promise<void> => {
        const enterpriseId = await this.enterpriseProposalRepository.findEnterpriseIdByUserId(input.userId);
        if (!enterpriseId) {
            throw new NotFoundError("Enterprise not found");
        }

        const proposal = await this.enterpriseProposalRepository.findById(input.proposalId);
        if (!proposal || proposal.enterpriseId !== enterpriseId) {
            throw new NotFoundError("Proposal not found");
        }

        if (proposal.status === "WITHDRAWN") {
            throw new BadRequestError("This proposal has been withdrawn by the enterprise");
        }

        if (proposal.quotationStatus === "CANCELLED") {
            throw new BadRequestError("This quotation request has already been cancelled by the customer");
        }

        if(proposal.quotationStatus === "ACCEPTED" ||proposal.quotationStatus === "PAY_ADVANCE" ||proposal.quotationStatus === "COMPLETED"){
            throw new BadRequestError("This quotation request has already been closed by the customer");
        }

        if (proposal.status !== "PENDING") {
            throw new BadRequestError("Only pending proposals can be withdrawn");
        }

        await this.enterpriseProposalRepository.withdrawProposal(input.proposalId, enterpriseId);
    };
}
