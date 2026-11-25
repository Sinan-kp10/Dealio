import { IBaseRepository } from "../../../../../shared/domian/base.repository";
import {
  EnterpriseAcceptedRequestListFiltersDto,
  PaginatedEnterpriseAcceptedRequestsDto,
} from "../../../application/dto/enterprise/enterprise-accepted-request-list.dto";

export interface IEnterpriseAcceptedRequestRepository extends IBaseRepository<{ id: string } | null> {
  findEnterpriseIdByUserId(userId: string): Promise<string | null>;
  findAcceptedRequests(enterpriseId: string,filter: EnterpriseAcceptedRequestListFiltersDto): Promise<PaginatedEnterpriseAcceptedRequestsDto>;
}
