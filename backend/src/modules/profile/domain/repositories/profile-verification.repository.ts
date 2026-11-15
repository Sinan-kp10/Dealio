import { IBaseRepository } from "../../../../shared/domian/base.repository.js";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto.js";
import {EnterpriseApprovalDetailsDto,PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto,} from "../../application/dto/profile-verification.dto.js";

export interface IProfileVerficationRepository extends IBaseRepository<EnterpriseUserDto | null> {
    pendingEnterprises(filters: PendingEnterpriseFiltersDto): Promise<PaginatedPendingEnterprisesDto>;
    getEnterpriseApprovalDetails(enterpriseId: string): Promise<EnterpriseApprovalDetailsDto | null>;
    VerfyEnterpriseKyc(enterpriseId: string): Promise<string | null>;
    rejectEnterpriseKyc(enterpriseId: string, reason: string): Promise<string | null>;
    verifyEnterpriseBankRecord(enterpriseId: string): Promise<string | null>;
    rejectEnterpriseBankRecord(enterpriseId: string, reason: string): Promise<string | null>;
}

