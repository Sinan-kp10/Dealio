import { IUseCase } from "../../../../shared/application/base.usecase";
import { IStorageService } from "../../../../shared/interfaces/IStorageService";
import { IProfileRepository } from "../../domain/repositories/profile-repository";
import { NotFoundError } from "../../../../shared/errors/app-error";
import type { RemoveProfilePictureDto } from "../dto/remove-profile-picture.dto";

export class RemoveProfilePictureUseCase implements IUseCase<RemoveProfilePictureDto, void> {
    constructor(
        private readonly profileRepository: IProfileRepository,
        private readonly storageService: IStorageService
    ) {}

    execute = async (input: RemoveProfilePictureDto): Promise<void> => {
        const existingKey = await this.profileRepository.findProfilePictureKey(input.userId);

        if (!existingKey) {
            throw new NotFoundError("Profile picture not found");
        }

        await this.storageService.deleteFile(existingKey);
        await this.profileRepository.removeProfilePictureKey(input.userId);
    };
}

