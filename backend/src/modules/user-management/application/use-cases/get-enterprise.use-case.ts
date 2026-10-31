import { IUserManagementRepository } from "../../domain/repositories/user-management.repository";
import { EnterpriseListFiltersDto, PaginatedEnterprisesDto } from "../dto/enterprise-list-item.dto";

import type { IUseCase } from "../../../../shared/application/base.usecase";

export class GetEnterpriseUseCase implements IUseCase<EnterpriseListFiltersDto, PaginatedEnterprisesDto> {
    constructor(
        private readonly userManagemantRepository : IUserManagementRepository
    ){}

    execute = async(filters :EnterpriseListFiltersDto) : Promise<PaginatedEnterprisesDto> => {

        return this.userManagemantRepository.findEnterprises(filters)
    }
}