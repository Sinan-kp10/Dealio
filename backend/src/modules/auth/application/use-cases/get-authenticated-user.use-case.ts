import { UnauthorizedError, ForbiddenError } from "../../../../shared/errors/app-error";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import type { AuthUserDto } from "../dto/user.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";
import type { IStorageService } from "../../../../shared/interfaces/IStorageService";

export class GetAuthenticatedUserUseCase implements IUseCase<string, AuthUserDto> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly storageService: IStorageService,
    ) {}

    execute = async (userId: string): Promise<AuthUserDto> => {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new UnauthorizedError("User not found", "UNAUTHENTICATED");
        }

        if (user.status === "SUSPENDED") {
            throw new ForbiddenError("Your account has been suspended by the administration.", "ACCOUNT_SUSPENDED");
        }

        let profilePictureUrl: string | null = null;
        if (user.profile_picture_key) {
            try {
                profilePictureUrl = user.profile_picture_key.startsWith("http")
                    ? user.profile_picture_key
                    : await this.storageService.getFileUrl(user.profile_picture_key);
            } catch {
                profilePictureUrl = null;
            }
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            phoneVerified: user.phone_verified ?? false,
            profilePictureUrl,
        };
    };
}

