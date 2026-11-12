import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadRequestError, ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import type { IOtpService } from "../../../../shared/interfaces/IOtpService";
import { VerifyPhoneOtpDto, VerifyPhoneOtpResult } from "../dto/phone-otp.dto";

export class VerifyPhoneOtpUseCase implements IUseCase<VerifyPhoneOtpDto, VerifyPhoneOtpResult> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: IOtpService
    ) {}

    execute = async (input: VerifyPhoneOtpDto): Promise<VerifyPhoneOtpResult> => {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const pendingPhone = await this.otpService.getPendingPhone(input.userId);

        if (!pendingPhone) {
            throw new BadRequestError("Phone verification session has expired. Please request a new code", "otp");
        }

        const otpStatus = await this.otpService.verifyPhoneOtp(input.userId, input.otp);

        if (otpStatus === "expired") {
            throw new BadRequestError("OTP has expired. Please request a new one", "otp");
        }

        if (otpStatus === "invalid") {
            throw new BadRequestError("Invalid OTP. Please try again", "otp");
        }

        const isVerifiedByOther = await this.userRepository.isPhoneVerified(pendingPhone);
        if (isVerifiedByOther) {
            throw new ConflictError("Phone number is already registered and verified", "phone");
        }

        await this.userRepository.verifyPhone(input.userId, pendingPhone);
        await this.otpService.deletePhoneOtp(input.userId);

        return {
            phone: pendingPhone,
            phoneVerified: true,
        };
    };
}

