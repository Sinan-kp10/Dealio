import { IUserManagementRepository } from "../../domain/repositories/user-management.repository";
import type {CustomerListFiltersDto, PaginatedCustomerDto,} from "../dto/customer-list-item.dto";

import type { IUseCase } from "../../../../shared/application/base.usecase";

export class GetCustomerUseCase implements IUseCase<CustomerListFiltersDto, PaginatedCustomerDto> {
    
    constructor( private readonly userManagementRepository: IUserManagementRepository) {}

    execute = async ( filters: CustomerListFiltersDto): Promise<PaginatedCustomerDto> => {

        return this.userManagementRepository.findCustomers(filters);
    }
}