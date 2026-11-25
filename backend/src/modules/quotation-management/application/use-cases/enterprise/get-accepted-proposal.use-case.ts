import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseAcceptedProposalRepository } from "../../../domain/repositories/enterprise/enterprise-accepted-proposal.repository";
import {GetEnterpriseAcceptedProposalsDto,PaginatedEnterpriseAcceptedProposalsDto,} from "../../dto/enterprise/enterprise-accepted-proposal-list.dto";

export class GetAcceptedProposalsUseCase implements IUseCase<GetEnterpriseAcceptedProposalsDto, PaginatedEnterpriseAcceptedProposalsDto>{
  constructor(
    private readonly enterpriseAcceptedProposalRepository: IEnterpriseAcceptedProposalRepository
  ) {}

  execute = async (input: GetEnterpriseAcceptedProposalsDto): Promise<PaginatedEnterpriseAcceptedProposalsDto> => {
    const enterpriseId = await this.enterpriseAcceptedProposalRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    return await this.enterpriseAcceptedProposalRepository.findAcceptedProposals(enterpriseId, input.filter);
  };
}
