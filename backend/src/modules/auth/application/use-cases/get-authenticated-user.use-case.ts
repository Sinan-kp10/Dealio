import { AppError } from "../../../../shared/errors/app-error";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import type { AuthUserDto } from "../dto/user.dto";

export class GetAuthenticatedUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    execute = async (userId: string): Promise<AuthUserDto> => {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError("User not found", 401, "UNAUTHENTICATED");
        }

        if (user.status === "SUSPENDED") {
            throw new AppError("Your account has been suspended by the administration", 403, "ACCOUNT_SUSPENDED");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    };
}

