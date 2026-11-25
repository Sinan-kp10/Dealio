import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseAcceptedProposalRepository } from "../../../domain/repositories/enterprise/enterprise-accepted-proposal.repository";
import {
  EnterpriseAcceptedProposalDetailsDto,
  GetEnterpriseAcceptedProposalDetailsDto,
} from "../../dto/enterprise/enterprise-accepted-proposal-details.dto";

export class GetAcceptedProposalDetailsUseCase implements IUseCase<GetEnterpriseAcceptedProposalDetailsDto, EnterpriseAcceptedProposalDetailsDto> {
  constructor(private readonly enterpriseAcceptedProposalRepository: IEnterpriseAcceptedProposalRepository) {}

  execute = async (input: GetEnterpriseAcceptedProposalDetailsDto): Promise<EnterpriseAcceptedProposalDetailsDto> => {
    const enterpriseId = await this.enterpriseAcceptedProposalRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    const details = await this.enterpriseAcceptedProposalRepository.findAcceptedProposalDetails(enterpriseId, input.proposalId);
    if (!details) {
      throw new NotFoundError("Accepted proposal not found");
    }

    return details;
  };
}
