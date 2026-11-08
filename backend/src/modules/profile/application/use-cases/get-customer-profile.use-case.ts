import { NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type { CustomerProfileDto } from "../dto/customer-profile.dto.js";
import type { IStorageService } from "../../../../shared/interfaces/IStorageService.js";
import { ICustomerProfileRepository } from "../../domain/repositories/customer-profile.repository.js";

export class GetCustomerProfileUseCase implements IUseCase<string, CustomerProfileDto> {
    constructor(
        private readonly customerProfileRepository: ICustomerProfileRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (userId: string): Promise<CustomerProfileDto> => {
        const profile = await this.customerProfileRepository.findCustomerProfile(userId);

        if (!profile) {
            throw new NotFoundError("Customer profile not found");
        }

        if (profile.profilePictureKey) {
            try {
                const profilePictureUrl = profile.profilePictureKey.startsWith("http")
                    ? profile.profilePictureKey
                    : await this.storageService.getFileUrl(profile.profilePictureKey);
                return {
                    ...profile,
                    profilePictureKey: profilePictureUrl,
                };
            } catch {
                return {
                    ...profile,
                    profilePictureKey: null,
                };
            }
        }

        return profile;
    };
}
