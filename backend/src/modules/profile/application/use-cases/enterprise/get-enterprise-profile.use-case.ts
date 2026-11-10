import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IStorageService } from "../../../../../shared/interfaces/IStorageService";
import { IEnterpriseProfileRepository } from "../../../domain/repositories/enterprise-profile.repository";
import { EnterpriseProfileDto } from "../../dto/enterprise-profile.dto";


export class  GetEnterpriseProfileUseCase implements IUseCase<string, EnterpriseProfileDto> {

    constructor(
        private readonly enterpriseProfileRepository: IEnterpriseProfileRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (userId : string): Promise<EnterpriseProfileDto> => {
        
        const profile = await this.enterpriseProfileRepository.findEnterpriseProfile(userId)

        if(!profile){
            throw new NotFoundError("Enterprise profile not found")
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

        return profile
    }
}