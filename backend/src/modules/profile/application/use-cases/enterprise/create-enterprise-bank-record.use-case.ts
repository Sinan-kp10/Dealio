import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { ConflictError, NotFoundError } from "../../../../../shared/errors/app-error.js";
import { IEnterprisBankRecordRepository } from "../../../domain/repositories/enterprise-bank-record.repository.js";
import { BankRecordRequestDto, CreateEnterpriseBankRecordDto } from "../../dto/enterprise-bank-details.dto.js";

export class CreateEnterpriseBankRecordUseCase implements IUseCase<CreateEnterpriseBankRecordDto, BankRecordRequestDto> {
    constructor(
        private readonly bankRecordRepository: IEnterprisBankRecordRepository
    ) {}

    execute = async (input: CreateEnterpriseBankRecordDto): Promise<BankRecordRequestDto> => {
        const { userId, AccountHolderName, BankAccountNumber, ifscCode, accountType, upiId } = input;

        const user = await this.bankRecordRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("Enterprise profile not found");
        }

        const { activeBankRecord, pendingRequest } = await this.bankRecordRepository.getBankRecord(user.enterpriseId);

        if (pendingRequest?.status === "PENDING") {
            throw new ConflictError("A bank account verification request is already under review. You cannot submit another request until the admin responds");
        }

        if (activeBankRecord) {
            throw new ConflictError("Your enterprise bank details are already verified. Use update to request changes");
        }

        return await this.bankRecordRepository.createBankRecordRequest(user.enterpriseId, {
            AccountHolderName,
            BankAccountNumber,
            ifscCode,
            accountType,
            upiId,
        });
    };
}