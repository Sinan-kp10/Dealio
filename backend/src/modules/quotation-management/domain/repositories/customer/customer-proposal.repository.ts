import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { ProposalStatus, PaginatedCustomerReceivedProposalsDto, GetReceivedProposalsQueryDto } from "../../../application/dto/customer/customer-received-proposal.dto";

export interface ICustomerProposalRepository extends IBaseRepository<{ id: string; status: ProposalStatus } | null> {
    findProposalsByQuotationId(quotationId: string, userId: string, query: GetReceivedProposalsQueryDto): Promise<PaginatedCustomerReceivedProposalsDto>;
}
