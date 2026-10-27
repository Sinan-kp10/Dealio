import { BaseRepository } from "../../../../shared/domian/base.repository";
import type { CustomerListFiltersDto, CustomerListItemDto, PaginatedUsersDto,} from "../../application/dto/user-list-item.dto";

export interface CustomerManagementRepository extends BaseRepository<CustomerListItemDto> {

  findUsers(filters: CustomerListFiltersDto): Promise<PaginatedUsersDto>
  suspendAccount(accountId: string, reason: string): Promise<void>
  reactivateAccount(accountId: string): Promise<void>

}
