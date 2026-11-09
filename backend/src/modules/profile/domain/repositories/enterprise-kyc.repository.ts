import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { KycRecordDto, SaveEnterpriseKycRequestDto } from "../../application/dto/enterprise-kyc.dto";

export interface EnterpriseUserDto {
    userId: string;
    enterpriseId: string;
}

export interface IEnterpriseKycRepository extends IBaseRepository<EnterpriseUserDto> {
    findById(userId: string): Promise<EnterpriseUserDto | null>;
    getKycDetails(enterpriseId: string): Promise<{ activeKyc: KycRecordDto | null; pendingRequest: KycRecordDto | null }>;
    createKycRequest(enterpriseId: string, data: SaveEnterpriseKycRequestDto): Promise<KycRecordDto>;
}
