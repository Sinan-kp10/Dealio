import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { ConflictError, NotFoundError } from "../../../../../shared/errors/app-error.js";
import { IEnterprisBankRecordRepository } from "../../../domain/repositories/enterprise-bank-record.repository.js";
import { BankRecordRequestDto, UpdateEnterpriseBankRecordDto } from "../../dto/enterprise-bank-details.dto.js";

export class UpdateEnterpriseBankRecordUseCase implements IUseCase<UpdateEnterpriseBankRecordDto, BankRecordRequestDto> {
    constructor(
        private readonly bankRecordRepository: IEnterprisBankRecordRepository
    ) {}

    execute = async (input: UpdateEnterpriseBankRecordDto): Promise<BankRecordRequestDto> => {
        const { userId, AccountHolderName, BankAccountNumber, ifscCode, accountType, upiId } = input;

        const user = await this.bankRecordRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("Enterprise profile not found");
        }

        const { activeBankRecord, pendingRequest } = await this.bankRecordRepository.getBankRecord(user.enterpriseId);

        if (pendingRequest?.status === "PENDING") {
            throw new ConflictError("A bank account update request is already under review. You cannot make further changes until the admin responds");
        }

        if (!activeBankRecord) {
            throw new NotFoundError("No verified bank details found. Please complete your initial bank details submission first");
        }

        return await this.bankRecordRepository.createBankRecordRequest(user.enterpriseId, {
            AccountHolderName: AccountHolderName ?? activeBankRecord.AccountHolderName,
            BankAccountNumber: BankAccountNumber ?? activeBankRecord.BankAccountNumber,
            ifscCode: ifscCode ?? activeBankRecord.ifscCode,
            accountType: accountType ?? activeBankRecord.accountType,
            upiId: upiId ?? activeBankRecord.upiId ?? "",
        });
    };
}
