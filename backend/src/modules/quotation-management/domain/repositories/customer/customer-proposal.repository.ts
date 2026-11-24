import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { ProposalStatus, PaginatedCustomerReceivedProposalsDto, GetReceivedProposalsQueryDto, ReceivedProposalWithQuotationDto } from "../../../application/dto/customer/customer-received-proposal.dto";
import { ReceivedProposalDetailsDto } from "../../../application/dto/customer/received-proposal-details.dto";

export interface ICustomerProposalRepository extends IBaseRepository<ReceivedProposalWithQuotationDto | null> {
    findProposalsByQuotationId(quotationId: string, userId: string, query: GetReceivedProposalsQueryDto): Promise<PaginatedCustomerReceivedProposalsDto>;
    findReceivedProposalDetails(proposalId: string, quotationId: string, userId: string): Promise<ReceivedProposalDetailsDto | null>;
    acceptReceivedProposal(proposalId: string, quotationId: string, enterpriseId: string): Promise<string | null>;
}
