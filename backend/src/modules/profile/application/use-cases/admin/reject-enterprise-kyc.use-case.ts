import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError } from "../../../../../shared/errors/app-error.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import { RejectVerificationDto } from "../../dto/profile-verification.dto.js";

export class RejectEnterpriseKycUseCase implements IUseCase<RejectVerificationDto, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository
    ) {}

    execute = async ({ enterpriseId, reason }: RejectVerificationDto): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        await this.profileVerificationRepository.rejectEnterpriseKyc(enterpriseId, reason);
    };
}

