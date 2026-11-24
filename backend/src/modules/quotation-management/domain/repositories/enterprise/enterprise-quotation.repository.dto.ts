import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { CustomerQuotationDetailsDto } from "../../../application/dto/enterprise/customer-quotation-details.dto";
import { EnterpriseQuotationListFiltersDto, PaginatedQuotationDto } from "../../../application/dto/enterprise/enterprise-quotation-list.dto";

export interface IEnterpriseQuotationRepository extends IBaseRepository<{ id: string } | null> {
    findEnterpriseIdByUserId(userId: string): Promise<string | null>;
    findAvailableQuotations(enterpriseId: string, filter: EnterpriseQuotationListFiltersDto): Promise<PaginatedQuotationDto>;
    findQuotationDetails(enterpriseId: string, quotationId: string): Promise<CustomerQuotationDetailsDto | null>;
    markNotInterested(enterpriseId: string, quotationId: string): Promise<void>;
}
