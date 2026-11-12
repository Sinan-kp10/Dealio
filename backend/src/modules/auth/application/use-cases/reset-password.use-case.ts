import { IUserRepository } from "../../domain/repositories/user.repository";
import type { IJwtTokenService } from "../../../../shared/interfaces/IJwtTokenService";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { BadRequestError } from "../../../../shared/errors/app-error";
import type { IPasswordService } from "../../../../shared/interfaces/IPasswordService";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class ResetPasswordUseCase implements IUseCase<ResetPasswordDto, void> {

    constructor(
        private readonly userRepository : IUserRepository,
        private readonly passwordService : IPasswordService,
        private readonly jwtTokenService : IJwtTokenService
    ){}

    execute = async (input : ResetPasswordDto) : Promise<void> => {

        const {email} = this.jwtTokenService.verifyPasswordResetToken(input.resetToken)

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new BadRequestError("Invalid or expired reset token.");
        }

        const passwordHash = await this.passwordService.hash(input.newPassword)
        

        await this.userRepository.changePassword(user.id, passwordHash)

    }
    
}