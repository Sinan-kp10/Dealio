import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError } from "../../../../../shared/errors/app-error.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import { RejectEnterpriseKycDto } from "../../dto/profile-verification.dto.js";

export class RejectEnterpriseKycUseCase implements IUseCase<RejectEnterpriseKycDto, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository
    ) {}

    execute = async ({ enterpriseId, reason }: RejectEnterpriseKycDto): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        await this.profileVerificationRepository.rejectEnterpriseKyc(enterpriseId, reason);
    };
}

