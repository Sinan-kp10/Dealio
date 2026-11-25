import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { EnterpriseAcceptedProposalDetailsDto } from "../../../application/dto/enterprise/enterprise-accepted-proposal-details.dto";
import {EnterpriseAcceptedProposalListFiltersDto,PaginatedEnterpriseAcceptedProposalsDto,} from "../../../application/dto/enterprise/enterprise-accepted-proposal-list.dto";

export interface IEnterpriseAcceptedProposalRepository extends IBaseRepository<{ id: string } | null> {
  findEnterpriseIdByUserId(userId: string): Promise<string | null>;
  findAcceptedProposals(enterpriseId: string,filter: EnterpriseAcceptedProposalListFiltersDto): Promise<PaginatedEnterpriseAcceptedProposalsDto>;
  findAcceptedProposalDetails(enterpriseId: string,proposalId: string): Promise<EnterpriseAcceptedProposalDetailsDto | null>;
}
