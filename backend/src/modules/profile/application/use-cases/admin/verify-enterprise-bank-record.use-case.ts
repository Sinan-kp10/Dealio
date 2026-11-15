import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError } from "../../../../../shared/errors/app-error.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import type { INotificationService } from "../../../../../shared/interfaces/INotificationService.js";

export class VerifyEnterpriseBankRecordUseCase implements IUseCase<string, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository,
        private readonly notificationService: INotificationService
    ) {}

    execute = async (enterpriseId: string): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        const managerUserId = await this.profileVerificationRepository.verifyEnterpriseBankRecord(enterpriseId.trim());

        if (managerUserId) {
            await this.notificationService.send({
                userId: managerUserId,
                type: "BANK_DETAILS_VERIFIED",
                title: "Bank Details Verified",
                message: "Your enterprise bank details have been verified by the administrator.",
            });
        }
    };
}
