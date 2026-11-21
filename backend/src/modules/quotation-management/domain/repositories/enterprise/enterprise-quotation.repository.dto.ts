import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { EnterpriseQuotationListFiltersDto, PaginatedQuotationDto } from "../../../application/dto/enterprise/enterprise-quotation-details.dto";

export interface IEnterpriseQuotationRepository extends IBaseRepository<{ id: string } | null> {
    findEnterpriseIdByUserId(userId: string): Promise<string | null>;
    findAvailableQuotations(enterpriseId: string, filter: EnterpriseQuotationListFiltersDto): Promise<PaginatedQuotationDto>;
    markNotInterested(enterpriseId: string, quotationId: string): Promise<void>;
}
