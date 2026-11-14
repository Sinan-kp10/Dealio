import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError } from "../../../../../shared/errors/app-error.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import { RejectVerificationDto } from "../../dto/profile-verification.dto.js";
import type { INotificationService } from "../../../../../shared/interfaces/INotificationService.js";

export class RejectEnterpriseBankRecordUseCase implements IUseCase<RejectVerificationDto, void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository,
        private readonly notificationService: INotificationService
    ) {}

    execute = async ({ enterpriseId, reason }: RejectVerificationDto): Promise<void> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        const managerUserId = await this.profileVerificationRepository.rejectEnterpriseBankRecord(enterpriseId, reason);

        if (managerUserId) {
            await this.notificationService.send({
                userId: managerUserId,
                type: "BANK_DETAILS_REJECTED",
                title: "Bank Details Rejected",
                message: "Your enterprise bank details were rejected. Please review your profile.",
            });
        }
    };
}
