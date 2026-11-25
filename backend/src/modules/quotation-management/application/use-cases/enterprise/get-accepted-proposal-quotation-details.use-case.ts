import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseAcceptedProposalRepository } from "../../../domain/repositories/enterprise/enterprise-accepted-proposal.repository";
import {EnterpriseAcceptedProposalQuotationDetailsDto,GetEnterpriseAcceptedProposalQuotationDetailsDto, } from "../../dto/enterprise/enterprise-accepted-proposal-quotation-details.dto";

export class GetAcceptedProposalQuotationDetailsUseCase implements IUseCase<GetEnterpriseAcceptedProposalQuotationDetailsDto, EnterpriseAcceptedProposalQuotationDetailsDto> {
  constructor(
    private readonly enterpriseAcceptedProposalRepository: IEnterpriseAcceptedProposalRepository
  ) {}

  execute = async (input: GetEnterpriseAcceptedProposalQuotationDetailsDto): Promise<EnterpriseAcceptedProposalQuotationDetailsDto> => {
    const enterpriseId = await this.enterpriseAcceptedProposalRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    const details = await this.enterpriseAcceptedProposalRepository.findAcceptedProposalQuotationDetails(enterpriseId, input.proposalId);
    if (!details) {
      throw new NotFoundError("Accepted proposal quotation details not found");
    }

    return details;
  };
}
