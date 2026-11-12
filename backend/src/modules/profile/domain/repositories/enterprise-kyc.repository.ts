import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { ActiveKycDto, KycRequestDto, SaveEnterpriseKycRequestDto } from "../../application/dto/enterprise-kyc.dto";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto";

export interface IEnterpriseKycRepository extends IBaseRepository<EnterpriseUserDto> {
    findById(userId: string): Promise<EnterpriseUserDto | null>;
    getKycDetails(enterpriseId: string): Promise<{ activeKyc: ActiveKycDto | null; pendingRequest: KycRequestDto | null }>;
    createKycRequest(enterpriseId: string, data: SaveEnterpriseKycRequestDto): Promise<KycRequestDto>;
}
