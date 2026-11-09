import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IStorageService } from "../../../../../shared/interfaces/IStorageService";
import { ICustomerProfileRepository } from "../../../domain/repositories/customer-profile.repository";
import { CustomerProfileDto } from "../../dto/customer-profile.dto";


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
