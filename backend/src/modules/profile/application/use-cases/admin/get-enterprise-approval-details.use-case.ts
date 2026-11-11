import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { BadRequestError, NotFoundError } from "../../../../../shared/errors/app-error.js";
import { IStorageService } from "../../../../../shared/interfaces/IStorageService.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import { EnterpriseApprovalDetailsDto } from "../../dto/profile-verification.dto.js";

export class GetEnterpriseApprovalDetailsUseCase implements IUseCase<string, EnterpriseApprovalDetailsDto> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (enterpriseId: string): Promise<EnterpriseApprovalDetailsDto> => {
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        const details = await this.profileVerificationRepository.getEnterpriseApprovalDetails(enterpriseId.trim());

        if (!details) {
            throw new NotFoundError("Enterprise approval details not found");
        }

        if (details.kyc?.documentKey) {
            try {
                details.kyc.documentUrl = await this.storageService.getFileUrl(details.kyc.documentKey);
            } catch {
                details.kyc.documentUrl = null;
            }
        }

        return details;
    };
}

