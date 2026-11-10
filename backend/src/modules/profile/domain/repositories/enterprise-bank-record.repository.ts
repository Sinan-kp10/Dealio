import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { ActiveBankRecordDto, BankRecordRequestDto, SaveEnterpriseBankRecordRequestDto } from "../../application/dto/enterprise-bank-details.dto";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto";

export interface IEnterprisBankRecordRepository extends IBaseRepository<EnterpriseUserDto> {
    findById(userId: string): Promise<EnterpriseUserDto | null>;
    getBankRecord(enterpriseId: string): Promise<{ activeBankRecord: ActiveBankRecordDto | null; pendingRequest: BankRecordRequestDto | null }>;
    createBankRecordRequest(enterpriseId: string, data: SaveEnterpriseBankRecordRequestDto): Promise<BankRecordRequestDto>;
}
