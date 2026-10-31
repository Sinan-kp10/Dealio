import { OtpService } from "../../../../infrastructure/security/otp.service";
import { AppError } from "../../../../shared/errors/app-error";
import { ResendOtpInput } from "../dto/verify-otp.dto";
import { EmailService } from "../../../../infrastructure/email/email.service";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class ResendOtpUseCase implements IUseCase<ResendOtpInput, void> {
    constructor(
        private readonly otpService: OtpService,
        private readonly emailService: EmailService,
    ) {}

    execute = async(dto : ResendOtpInput) : Promise<void> => {

        const normalizedEmail = dto.email.trim().toLowerCase()

        const otp = dto.purpose === "PASSWORD_RESET" ? await this.otpService.resendPasswordResetOtp(normalizedEmail) 
            : await this.otpService.resend(normalizedEmail);

        try {
            await this.emailService.sendOtp(normalizedEmail,otp)
            
        } catch{

            if (dto.purpose === "REGISTRATION") {
                await this.otpService.delete(normalizedEmail);
            } else {
                await this.otpService.deletePasswordResetOtp(normalizedEmail);
            }

            throw new AppError("Failed to send verification email", 502);
        }
    }
}