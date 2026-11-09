import { randomUUID } from "node:crypto";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { IStorageService } from "../../../../shared/interfaces/IStorageService";
import { IEnterpriseKycRepository } from "../../domain/repositories/enterprise-kyc.repository";
import { KycRecordDto, UpdateEnterpriseKycDto } from "../dto/enterprise-kyc.dto";

export class UpdateEnterpriseKycUseCase implements IUseCase<UpdateEnterpriseKycDto, KycRecordDto> {
    constructor(
        private readonly enterpriseKycRepository: IEnterpriseKycRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (input: UpdateEnterpriseKycDto): Promise<KycRecordDto> => {
        const { userId, businessType, fullLegalName, documentType, file } = input;

        const user = await this.enterpriseKycRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("Enterprise profile not found");
        }

        const { activeKyc, pendingRequest } = await this.enterpriseKycRepository.getKycDetails(user.enterpriseId);

        if (pendingRequest?.status === "PENDING") {
            throw new ConflictError("A KYC update request is already under review. You cannot make further changes until the admin responds");
        }

        if (!activeKyc) {
            throw new NotFoundError("No verified KYC found. Please complete your initial KYC submission first");
        }

        let documentStorageKey = activeKyc.documentStorageKey;

        if (file) {
            documentStorageKey = `kyc/${user.enterpriseId}/${randomUUID()}`;
            await this.storageService.uploadFile({
                key: documentStorageKey,
                buffer: file.buffer,
                contentType: file.mimetype,
            });
        }

        return await this.enterpriseKycRepository.createKycRequest(user.enterpriseId, {
            businessType: businessType ?? activeKyc.businessType,
            fullLegalName: fullLegalName ?? activeKyc.fullLegalName,
            documentType: documentType ?? activeKyc.documentType,
            documentStorageKey,
        });
    };
}
