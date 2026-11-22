import { IUseCase } from "../../../../../shared/application/base.usecase";
import { ConflictError, NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseProposalRepository } from "../../../domain/repositories/enterprise/enterprise-proposal.repository";
import { CreateProposalInputDto } from "../../dto/enterprise/enterprise-proposal.dto";

export class CreateProposalUseCase implements IUseCase<CreateProposalInputDto, void> {
    constructor(
        private readonly enterpriseProposalRepository: IEnterpriseProposalRepository
    ) {}

    execute = async (input: CreateProposalInputDto): Promise<void> => {
        const enterpriseId = await this.enterpriseProposalRepository.findEnterpriseIdByUserId(input.userId);
        if (!enterpriseId) {
            throw new NotFoundError("Enterprise not found");
        }

        const quotationExists = await this.enterpriseProposalRepository.findQuotationById(input.quotationId);
        if (!quotationExists) {
            throw new NotFoundError("Quotation not found");
        }

        const existingProposal = await this.enterpriseProposalRepository.findProposalByQuotationAndEnterprise(
            input.quotationId,
            enterpriseId
        );
        if (existingProposal) {
            throw new ConflictError("A proposal has already been submitted for this quotation");
        }

        const totalAmount = Number((input.quantity * input.unitPrice).toFixed(2));
        await this.enterpriseProposalRepository.createEnterpriseProposal(enterpriseId, input, totalAmount);
    };
}
