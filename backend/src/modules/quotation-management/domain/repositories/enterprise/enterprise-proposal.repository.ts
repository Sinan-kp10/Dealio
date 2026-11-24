import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import {
    CreateProposalInputDto,
    ProposalStatus,
    QuotationBasicInfoDto,
} from "../../../application/dto/enterprise/enterprise-proposal.dto";

export interface IEnterpriseProposalRepository extends IBaseRepository<{ id: string; status: ProposalStatus; enterpriseId: string } | null> {
    findEnterpriseIdByUserId(userId: string): Promise<string | null>;
    findQuotationById(quotationId: string): Promise<QuotationBasicInfoDto | null>;
    findProposalByQuotationAndEnterprise(quotationId: string, enterpriseId: string): Promise<{ id: string } | null>;
    createEnterpriseProposal(enterpriseId: string, data: CreateProposalInputDto, totalAmount: number): Promise<void>;
    withdrawProposal(proposalId: string, enterpriseId: string): Promise<void>;
}