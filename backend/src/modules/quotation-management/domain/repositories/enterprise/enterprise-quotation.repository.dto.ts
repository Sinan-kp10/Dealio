import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { EnterpriseQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-quotation-details.dto";
import { EnterpriseQuotationListFiltersDto, PaginatedQuotationDto } from "../../../application/dto/enterprise/enterprise-quotation-list.dto";

export interface IEnterpriseQuotationRepository extends IBaseRepository<{ id: string } | null> {
    findEnterpriseIdByUserId(userId: string): Promise<string | null>;
    findAvailableQuotations(enterpriseId: string, filter: EnterpriseQuotationListFiltersDto): Promise<PaginatedQuotationDto>;
    findQuotationDetails(enterpriseId: string, quotationId: string): Promise<EnterpriseQuotationDetailsDto | null>;
    markNotInterested(enterpriseId: string, quotationId: string): Promise<void>;
}
