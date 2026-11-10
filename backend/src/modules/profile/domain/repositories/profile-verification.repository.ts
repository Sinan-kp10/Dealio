import { IBaseRepository } from "../../../../shared/domian/base.repository.js";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto.js";
import {PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto,} from "../../application/dto/profile-verification.dto.js";

export interface IProfileVerficationRepository extends IBaseRepository<EnterpriseUserDto | null> {
    pendingEnterprises(filters: PendingEnterpriseFiltersDto): Promise<PaginatedPendingEnterprisesDto>;
}
