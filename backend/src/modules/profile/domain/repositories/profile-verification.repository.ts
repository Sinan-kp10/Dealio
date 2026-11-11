import { IBaseRepository } from "../../../../shared/domian/base.repository.js";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto.js";
import {EnterpriseApprovalDetailsDto,PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto,} from "../../application/dto/profile-verification.dto.js";

export interface IProfileVerficationRepository extends IBaseRepository<EnterpriseUserDto | null> {
    pendingEnterprises(filters: PendingEnterpriseFiltersDto): Promise<PaginatedPendingEnterprisesDto>;
    getEnterpriseApprovalDetails(enterpriseId: string): Promise<EnterpriseApprovalDetailsDto | null>;
    VerfyEnterpriseKyc(enterpriseId : string,) : Promise<void>
    rejectEnterpriseKyc(enterpriseId: string, reason: string): Promise<void>;
    verifyEnterpriseBankRecord(enterpriseId: string): Promise<void>;
    rejectEnterpriseBankRecord(enterpriseId: string, reason: string): Promise<void>;
}

