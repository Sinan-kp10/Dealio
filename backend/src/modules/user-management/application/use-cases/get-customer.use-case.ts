import { IUserManagementRepository } from "../../domain/repositories/user-management.repository";
import type {CustomerListFiltersDto, PaginatedCustomerDto,} from "../dto/customer-list-item.dto";

export class GetCustomerUseCase {
    
    constructor( private readonly userManagementRepository: IUserManagementRepository) {}

    execute = async ( filters: CustomerListFiltersDto): Promise<PaginatedCustomerDto> => {

        return this.userManagementRepository.findCustomers(filters);
    }
}