import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { ProposalStatus, PaginatedCustomerReceivedProposalsDto, GetReceivedProposalsQueryDto } from "../../../application/dto/customer/customer-received-proposal.dto";
import { CustomerProposalDetailsDto } from "../../../application/dto/customer/customer-proposal-details.dto";

export interface ICustomerProposalRepository extends IBaseRepository<{ id: string; status: ProposalStatus } | null> {
    findProposalsByQuotationId(quotationId: string, userId: string, query: GetReceivedProposalsQueryDto): Promise<PaginatedCustomerReceivedProposalsDto>;
    findProposalDetails(proposalId: string, quotationId: string, userId: string): Promise<CustomerProposalDetailsDto | null>;
}
