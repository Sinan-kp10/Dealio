import { AppError } from "../../../../shared/errors/app-error";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class GetCurrentUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    execute = async (userId: string) => {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError("User not found.", 401);
        }

        return {
            id: user.id,
            name : user.name,
            email: user.email,
            role: user.role,
        };
    };
}
