import { IUserManagementRepository } from "../../domain/repositories/user-management.repository";
import { EnterpriseListFiltersDto, PaginatedEnterprisesDto } from "../dto/enterprise-list-item.dto";

export class GetEnterpriseUseCase {
    constructor(
        private readonly userManagemantRepository : IUserManagementRepository
    ){}

    execute = async(filters :EnterpriseListFiltersDto) : Promise<PaginatedEnterprisesDto> => {

        return this.userManagemantRepository.findEnterprises(filters)
    }
}