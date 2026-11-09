import { IUserRepository } from "../../domain/repositories/user.repository";
import type { IJwtTokenService } from "../../../../shared/interfaces/IJwtTokenService";
import type { IOtpService } from "../../../../shared/interfaces/IOtpService";
import { BadRequestError } from "../../../../shared/errors/app-error";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class VerifyPasswordResetOtpUseCase implements IUseCase<VerifyOtpDto, { resetToken: string }> {

    constructor(
        private readonly userRespository : IUserRepository,
        private readonly otpService : IOtpService,
        private readonly jwtTokenService : IJwtTokenService
    ){}

    execute = async (input : VerifyOtpDto) : Promise<{resetToken : string}> => {

        const email = input.email.trim().toLowerCase()
        const user = await this.userRespository.findByEmail(email)

        if (!user) {
            throw new BadRequestError("Invalid or expired OTP", "otp");
        }

        const result = await this.otpService.verifyPasswordResetOtp(email, input.otp)

        if (result === "invalid") {
            throw new BadRequestError("Invalid OTP. Please try again", "otp");
        }

        if(result === "expired"){
            throw new BadRequestError("OTP has expired. Please request a new one", "otp")
        }

        const resetToken = this.jwtTokenService.generatePasswordResetToken(email)

        return {resetToken}
    }
}