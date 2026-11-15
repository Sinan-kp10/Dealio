import { IUseCase } from "../../../../../shared/application/base.usecase";
import { BadRequestError } from "../../../../../shared/errors/app-error";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository";
import type { INotificationService } from "../../../../../shared/interfaces/INotificationService";

export class VerfyEnterpriseKycUseCase implements IUseCase<string, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository,
        private readonly notificationService: INotificationService
    ) {}

    execute = async (enterpriseId: string): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        const managerUserId = await this.profileVerificationRepository.VerfyEnterpriseKyc(enterpriseId);

        if (managerUserId) {
            await this.notificationService.send({
                userId: managerUserId,
                type: "KYC_VERIFIED",
                title: "KYC Verification Approved",
                message: "Your enterprise KYC verification has been verified by the administrator.",
            });
        }
    };
}
