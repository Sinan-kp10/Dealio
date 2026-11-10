import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { NotFoundError } from "../../../../../shared/errors/app-error.js";
import { IEnterprisBankRecordRepository } from "../../../domain/repositories/enterprise-bank-record.repository.js";
import { EnterpriseBankrecordDto } from "../../dto/enterprise-bank-details.dto.js";

export class GetEnterpriseBankRecordUseCase implements IUseCase<string, EnterpriseBankrecordDto> {
    constructor(
        private readonly bankRecordRepository: IEnterprisBankRecordRepository
    ) {}

    execute = async (userId: string): Promise<EnterpriseBankrecordDto> => {
        const user = await this.bankRecordRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("Enterprise profile not found");
        }

        const { activeBankRecord, pendingRequest } = await this.bankRecordRepository.getBankRecord(user.enterpriseId);

        return {
            activeBankRecord,
            pendingRequest,
        };
    };
}
