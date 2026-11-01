import { IUserRepository } from "../../domain/repositories/user.repository";
import { JwtTokenService } from "../../infrastructure/security/jwt-token.service";
import { OtpService } from "../../infrastructure/security/otp.service";
import { BadRequestError } from "../../../../shared/errors/app-error";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class VerifyPasswordResetOtpUseCase implements IUseCase<VerifyOtpDto, { resetToken: string }> {

    constructor(
        private readonly userRespository : IUserRepository,
        private readonly otpService : OtpService,
        private readonly jwtTokenService : JwtTokenService
    ){}

    execute = async (dto : VerifyOtpDto) : Promise<{resetToken : string}> => {

        const email = dto.email.trim().toLowerCase()
        const user = await this.userRespository.findByEmail(email)

        if (!user) {
            throw new BadRequestError("Invalid or expired OTP");
        }

        const result = await this.otpService.verifyPasswordResetOtp(email, dto.otp)

        if (result === "invalid") {
            throw new BadRequestError("Invalid OTP. Please try again");
        }

        if(result === "expired"){
            throw new BadRequestError("OTP has expired. Please request a new one")
        }

        const resetToken = this.jwtTokenService.generatePasswordResetToken(email)

        return {resetToken}
    }
}