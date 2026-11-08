import { randomUUID } from "node:crypto";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { IStorageService } from "../../../../shared/interfaces/IStorageService";
import { IProfileRepository } from "../../domain/repositories/profile-repository";
import { UpdatedProfilePictureDto, UpdateProfilePictureDto } from "../dto/profile-picture.dto";

export class UpdateProfilePictureUseCase implements IUseCase<UpdateProfilePictureDto,UpdatedProfilePictureDto> {
    constructor(
        private readonly profileRepository: IProfileRepository,
        private readonly storageService: IStorageService
    ) {}
    execute = async (input: UpdateProfilePictureDto): Promise<UpdatedProfilePictureDto> =>{
        
        const { userId, file} = input

        const existingKey = await this.profileRepository.findProfilePictureKey(userId)
        const newKey = `profiles/${userId}/${randomUUID()}`

        await this.storageService.uploadFile({
            key : newKey,
            buffer : file.buffer,
            contentType : file.mimetype
        })
        
        await this.profileRepository.updateProfilePictureKey(userId,newKey)

        if(existingKey){
            await this.storageService.deleteFile(existingKey)
        }

        const profilePictureUrl = await this.storageService.getFileUrl(newKey)

        return {
            profilePictureUrl
        }

    }
}   