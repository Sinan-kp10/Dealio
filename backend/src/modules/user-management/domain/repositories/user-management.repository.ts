import { BaseRepository } from "../../../../shared/domian/base.repository";
import type { CustomerListFiltersDto, CustomerListItemDto, PaginatedCustomerDto,} from "../../application/dto/customer-list-item.dto";
import { EnterpriseListFiltersDto, PaginatedEnterprisesDto } from "../../application/dto/enterprise-list-item.dto";

export interface UserManagementRepository extends BaseRepository<CustomerListItemDto> {

  findCustomers(filters: CustomerListFiltersDto): Promise<PaginatedCustomerDto>
  findEnterprises(filters: EnterpriseListFiltersDto): Promise<PaginatedEnterprisesDto>
  suspendAccount(accountId: string, reason: string): Promise<void>
  reactivateAccount(accountId: string): Promise<void>

}
