import { IUseCase } from "../../../../shared/application/base.usecase";
import { AppError } from "../../../../shared/errors/app-error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { PasswordService } from "../../infrastructure/security/password.service";
import { ChangePasswordDto } from "../dto/change-password.dto";

export class ChangePasswordUseCase implements IUseCase<ChangePasswordDto, void> {

    constructor(
        private readonly userRepository : IUserRepository,
        private readonly passwordService : PasswordService
    ){}

    execute = async (dto : ChangePasswordDto): Promise<void> => {
        
        const email = dto.email.trim().toLowerCase()

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError("User not found", 404)
        }

        const isValidPassword = await this.passwordService.verify(dto.currentPassword, user.password_hash)

        if(!isValidPassword){
            throw new AppError("Current password is incorrect", 400)
        }

        const passwordHash = await this.passwordService.hash(dto.newPassword)

        await this.userRepository.changePassword(user.id, passwordHash)

    }
}