import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import { AvailableQuotationDetailsDto } from "../../../application/dto/enterprise/enterprise-available-quotation-details.dto";
import { AvailableQuotationListFiltersDto, PaginatedAvailableQuotationsDto } from "../../../application/dto/enterprise/enterprise-available-quotation-list.dto";

export interface IEnterpriseQuotationRepository extends IBaseRepository<{ id: string } | null> {
    findEnterpriseIdByUserId(userId: string): Promise<string | null>;
    findAvailableQuotations(enterpriseId: string, filter: AvailableQuotationListFiltersDto): Promise<PaginatedAvailableQuotationsDto>;
    findQuotationDetails(enterpriseId: string, quotationId: string): Promise<AvailableQuotationDetailsDto | null>;
    markNotInterested(enterpriseId: string, quotationId: string): Promise<void>;
}
