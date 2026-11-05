import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadRequestError, ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { JwtTokenService } from "../../infrastructure/security/jwt-token.service";
import { OtpService } from "../../infrastructure/security/otp.service";
import { VerifyEmailChangeDto, VerifyEmailChangeResult } from "../dto/change-email.dto";

export class VerifyEmailChangeUseCase implements IUseCase<VerifyEmailChangeDto, VerifyEmailChangeResult> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtTokenService
    ) {}

    execute = async (input : VerifyEmailChangeDto): Promise<VerifyEmailChangeResult> => {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const pendingEmail = await this.otpService.getPendingEmailChange(input.userId);

        if (!pendingEmail) {
            throw new BadRequestError("Email change request has expired. Please request a new verification code");
        }

        const otpStatus = await this.otpService.verifyEmailChangeOtp(input.userId, input.otp);

        if (otpStatus === "expired") {
            throw new BadRequestError("OTP has expired. Please request a new one", "otp");
        }

        if (otpStatus === "invalid") {
            throw new BadRequestError("Invalid OTP. Please try again", "otp");
        }

        const emailExists = await this.userRepository.findByEmail(pendingEmail);

        if (emailExists && emailExists.id !== user.id) {
            throw new ConflictError("Email is already registered");
        }

        await this.userRepository.changeEmail(input.userId, pendingEmail);
        await this.otpService.deleteEmailChangeOtp(input.userId);

        const tokenPayload = {
            userId: user.id,
            email: pendingEmail,
            role: user.role,
        };

        const accessToken = this.jwtService.generateAccessToken(tokenPayload);
        const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

        return {
            accessToken,
            refreshToken,
            email: pendingEmail,
        };
    };
}

