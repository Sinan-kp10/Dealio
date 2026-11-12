import { IUseCase } from "../../../../../shared/application/base.usecase";
import { BadRequestError } from "../../../../../shared/errors/app-error";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository";

export class VerfyEnterpriseKycUseCase implements IUseCase<string,void> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository
    ){}

    execute = async(enterpriseId : string): Promise<void> => {
        
        if (!enterpriseId) {
            throw new BadRequestError("Enterprise ID is required");
        }

        await this.profileVerificationRepository.VerfyEnterpriseKyc(enterpriseId);
    }
}