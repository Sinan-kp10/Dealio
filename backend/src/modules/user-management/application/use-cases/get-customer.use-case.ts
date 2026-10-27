import { CustomerManagementRepository } from "../../domain/repositories/customer-management.repository";
import type {CustomerListFiltersDto, PaginatedUsersDto,} from "../dto/user-list-item.dto";

export class GetCustomerUseCase {
    
    constructor( private readonly userManagementRepository: CustomerManagementRepository) {}

    execute = async ( filters: CustomerListFiltersDto): Promise<PaginatedUsersDto> => {

        return this.userManagementRepository.findUsers(filters);
    }
}