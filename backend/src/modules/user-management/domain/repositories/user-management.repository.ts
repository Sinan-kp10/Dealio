import { BaseRepository } from "../../../../shared/domian/base.repository";
import type { PaginatedUsersDto, UserListFiltersDto, UserListItemDto,} from "../../application/dto/user-list-item.dto";

export interface UserManagementRepository extends BaseRepository<UserListItemDto> {

  findUsers(filters: UserListFiltersDto): Promise<PaginatedUsersDto>
}
