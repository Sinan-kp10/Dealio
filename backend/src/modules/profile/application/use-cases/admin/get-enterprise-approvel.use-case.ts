import { IUseCase } from "../../../../../shared/application/base.usecase.js";
import { IProfileVerficationRepository } from "../../../domain/repositories/profile-verification.repository.js";
import {PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto,} from "../../dto/profile-verification.dto.js";

export class GetEnterpriseApprovalUseCase implements IUseCase<PendingEnterpriseFiltersDto, PaginatedPendingEnterprisesDto> {
    constructor(
        private readonly profileVerificationRepository: IProfileVerficationRepository
    ) {}

    execute = async (filters: PendingEnterpriseFiltersDto): Promise<PaginatedPendingEnterprisesDto> => {
        return this.profileVerificationRepository.pendingEnterprises(filters);
    };
}
