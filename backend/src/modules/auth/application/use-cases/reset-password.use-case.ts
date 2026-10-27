import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtTokenService } from "../../infrastructure/security/jwt-token.service";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { AppError } from "../../../../shared/errors/app-error";
import { PasswordService } from "../../infrastructure/security/password.service";

export class ResetPasswordUseCase {

    constructor(
        private readonly userRepository : UserRepository,
        private readonly passwordService : PasswordService,
        private readonly jwtTokenService : JwtTokenService
    ){}

    execute = async (dto : ResetPasswordDto) : Promise<void> => {

        const {email} = this.jwtTokenService.verifyPasswordResetToken(dto.resetToken)

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Invalid or expired reset token.", 400);
        }

        const passwordHash = await this.passwordService.hash(dto.newPassword)
        

        await this.userRepository.updatePassword(user.id, passwordHash)

    }
    
}