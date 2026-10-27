import type {PaginatedUsersDto,UserListFiltersDto,} from "../dto/user-list-item.dto";
import type {UserManagementRepository,} from "../../domain/repositories/user-management.repository";

export class GetUsersUseCase {
    
    constructor( private readonly userManagementRepository: UserManagementRepository) {}

    execute = async ( filters: UserListFiltersDto): Promise<PaginatedUsersDto> => {

        return this.userManagementRepository.findUsers(filters);
    }
}