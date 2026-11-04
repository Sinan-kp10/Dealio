import { IUseCase } from "../../../../shared/application/base.usecase";
import { NotFoundError, BadRequestError } from "../../../../shared/errors/app-error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { PasswordService } from "../../infrastructure/security/password.service";
import { ChangePasswordDto } from "../dto/change-password.dto";

export class ChangePasswordUseCase implements IUseCase<ChangePasswordDto, void> {

    constructor(
        private readonly userRepository : IUserRepository,
        private readonly passwordService : PasswordService
    ){}

    execute = async (input : ChangePasswordDto): Promise<void> => {
        
        const email = input.email.trim().toLowerCase()

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new NotFoundError("User not found")
        }

        const isValidPassword = await this.passwordService.verify(input.currentPassword, user.password_hash)

        if(!isValidPassword){
            throw new BadRequestError("Current password is incorrect", "currentPassword")
        }

        const passwordHash = await this.passwordService.hash(input.newPassword)

        await this.userRepository.changePassword(user.id, passwordHash)

    }
}