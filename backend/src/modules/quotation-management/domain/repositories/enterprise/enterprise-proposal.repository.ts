import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { CreateProposalInputDto, ProposalStatus } from "../../../application/dto/enterprise/enterprise-proposal.dto";

export interface IEnterpriseProposalRepository extends IBaseRepository<{ id: string; status: ProposalStatus } | null> {
    findEnterpriseIdByUserId(userId: string): Promise<string | null>;
    findQuotationById(quotationId: string): Promise<boolean>;
    findProposalByQuotationAndEnterprise(quotationId: string, enterpriseId: string): Promise<{ id: string } | null>;
    createEnterpriseProposal(enterpriseId: string, data: CreateProposalInputDto, totalAmount: number): Promise<void>;
}
