import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError } from "../../../../../shared/errors/app-error.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import { RejectVerificationDto } from "../../dto/profile-verification.dto.js";
import type { INotificationService } from "../../../../../shared/interfaces/INotificationService.js";

export class RejectEnterpriseKycUseCase implements IUseCase<RejectVerificationDto, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository,
        private readonly notificationService: INotificationService
    ) {}

    execute = async ({ enterpriseId, reason }: RejectVerificationDto): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        const managerUserId = await this.profileVerificationRepository.rejectEnterpriseKyc(enterpriseId, reason);

        if (managerUserId) {
            await this.notificationService.send({
                userId: managerUserId,
                type: "KYC_REJECTED",
                title: "KYC Verification Rejected",
                message: "Your enterprise KYC verification was rejected. Please review your profile.",
            });
        }
    };
}
