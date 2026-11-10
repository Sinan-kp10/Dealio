import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IStorageService } from "../../../../../shared/interfaces/IStorageService";
import { IEnterpriseKycRepository } from "../../../domain/repositories/enterprise-kyc.repository";
import { EnterpriseKycDetailsDto } from "../../dto/enterprise-kyc.dto";


export class GetEnterpriseKycUseCase implements IUseCase<string, EnterpriseKycDetailsDto> {
    constructor(
        private readonly enterpriseKycRepository: IEnterpriseKycRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (userId: string): Promise<EnterpriseKycDetailsDto> => {
        const user = await this.enterpriseKycRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("Enterprise profile not found");
        }

        const { activeKyc, pendingRequest } = await this.enterpriseKycRepository.getKycDetails(user.enterpriseId);

        if (activeKyc?.documentStorageKey) {
            activeKyc.documentUrl = await this.storageService.getFileUrl(activeKyc.documentStorageKey);
        }

        if (pendingRequest?.documentStorageKey) {
            pendingRequest.documentUrl = await this.storageService.getFileUrl(pendingRequest.documentStorageKey);
        }

        return {
            activeKyc,
            pendingRequest,
        };
    };
}
