import { IUseCase } from "../../../../../shared/application/base.usecase";
import { BadRequestError, ForbiddenError, NotFoundError } from "../../../../../shared/errors/app-error";
import { INotificationService } from "../../../../../shared/interfaces/INotificationService";
import { ICustomerProposalRepository } from "../../../domain/repositories/customer/customer-proposal.repository";
import { AcceptReceivedProposalInputDto } from "../../dto/customer/customer-received-proposal.dto";

export class AcceptReceivedProposalUseCase implements IUseCase<AcceptReceivedProposalInputDto, void> {
    constructor(
        private readonly customerProposalRepository: ICustomerProposalRepository,
        private readonly notificationService: INotificationService
    ) {}

    execute = async (input: AcceptReceivedProposalInputDto): Promise<void> => {
        const proposal = await this.customerProposalRepository.findById(input.proposalId);

        if (!proposal || proposal.quotationId !== input.quotationId) {
            throw new NotFoundError("Proposal not found");
        }

        if (proposal.customerId !== input.userId) {
            throw new ForbiddenError("You are not authorized to accept proposals for this quotation");
        }

        if (proposal.quotationStatus === "CANCELLED" || proposal.quotationStatus === "ACCEPTED" || proposal.quotationStatus === "PAY_ADVANCE" || proposal.quotationStatus === "COMPLETED") {
            throw new BadRequestError("Cannot accept proposal because this quotation request is no longer open");
        }

        if (proposal.status !== "PENDING") {
            throw new BadRequestError("This proposal is no longer available to accept");
        }

        const managerUserId = await this.customerProposalRepository.acceptReceivedProposal(
            input.proposalId,
            input.quotationId,
            proposal.enterpriseId
        );

        if (managerUserId) {
            await this.notificationService.send({
                userId: managerUserId,
                type: "PROPOSAL_ACCEPTED",
                title: "Proposal Accepted!",
                message: `Your proposal for "${proposal.productName}" has been accepted by the customer.`,
            });
        }
    };
}
