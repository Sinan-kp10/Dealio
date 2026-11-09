import { randomUUID } from "node:crypto";
import { IUseCase } from "../../../../../shared/application/base.usecase";
import { CreateEnterpriseKycDto, KycRequestDto } from "../../dto/enterprise-kyc.dto";
import { IEnterpriseKycRepository } from "../../../domain/repositories/enterprise-kyc.repository";
import { IStorageService } from "../../../../../shared/interfaces/IStorageService";
import { ConflictError, NotFoundError } from "../../../../../shared/errors/app-error";


export class CreateEnterpriseKycUseCase implements IUseCase<CreateEnterpriseKycDto, KycRequestDto> {
    constructor(
        private readonly enterpriseKycRepository: IEnterpriseKycRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (input: CreateEnterpriseKycDto): Promise<KycRequestDto> => {
        const { userId, businessType, fullLegalName, documentType, file } = input;

        const user = await this.enterpriseKycRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("Enterprise profile not found");
        }

        const { activeKyc, pendingRequest } = await this.enterpriseKycRepository.getKycDetails(user.enterpriseId);

        if (pendingRequest?.status === "PENDING") {
            throw new ConflictError("A KYC verification request is already under review. You cannot submit another request until the admin responds");
        }

        if (activeKyc) {
            throw new ConflictError("Your enterprise KYC is already verified. Use update to request changes");
        }

        const storageKey = `kyc/${user.enterpriseId}/${randomUUID()}`;

        await this.storageService.uploadFile({
            key: storageKey,
            buffer: file.buffer,
            contentType: file.mimetype,
        });

        return await this.enterpriseKycRepository.createKycRequest(user.enterpriseId, {
            businessType,
            fullLegalName,
            documentType,
            documentStorageKey: storageKey,
        });
    };
}
