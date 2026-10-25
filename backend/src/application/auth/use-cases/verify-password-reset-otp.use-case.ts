import { UserRepository } from "../../../domain/auth/repositories/user.repository";
import { JwtTokenService } from "../../../infrastructure/security/jwt-token.service";
import { OtpService } from "../../../infrastructure/security/otp.service";
import { AppError } from "../../../shared/errors/app-error";
import { VerifyOtpDto } from "../dto/verify-otp.dto";

export class VerifyPasswordResetOtpUseCase {

    constructor(
        private readonly userRespository : UserRepository,
        private readonly otpService : OtpService,
        private readonly jwtTokenService : JwtTokenService
    ){}

    execute = async (dto : VerifyOtpDto) : Promise<{resetToken : string}> => {

        const email = dto.email.trim().toLowerCase()
        const user = this.userRespository.findByEmail(email)

        if (!user) {
            throw new AppError("Invalid or expired OTP", 400);
        }

        const result = await this.otpService.verifyPasswordResetOtp(email, dto.otp)

        if (result === "invalid") {
            throw new AppError("Invalid OTP. Please try again", 400);
        }

        if(result === "expired"){
            throw new AppError("OTP has expired. Please request a new one", 400)
        }

        const resetToken = this.jwtTokenService.generatePasswordResetToken(email)

        return {resetToken}
    }
}