import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError } from "../../../../../shared/errors/app-error.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";

export class VerifyEnterpriseBankRecordUseCase implements IUseCase<string, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository
    ) {}

    execute = async (enterpriseId: string): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        await this.profileVerificationRepository.verifyEnterpriseBankRecord(enterpriseId.trim());
    };
}

