import { OtpService } from "../../infrastructure/security/otp.service";
import { BadGatewayError } from "../../../../shared/errors/app-error";
import { ResendOtpInput } from "../dto/verify-otp.dto";
import { EmailService } from "../../../../infrastructure/email/email.service";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class ResendOtpUseCase implements IUseCase<ResendOtpInput, void> {
    constructor(
        private readonly otpService: OtpService,
        private readonly emailService: EmailService,
    ) {}

    execute = async(input : ResendOtpInput) : Promise<void> => {

        const normalizedEmail = input.email.trim().toLowerCase()

        const otp = input.purpose === "PASSWORD_RESET" ? await this.otpService.resendPasswordResetOtp(normalizedEmail) 
            : await this.otpService.resend(normalizedEmail);

        try {
            await this.emailService.sendOtp(normalizedEmail,otp)
            
        } catch{

            if (input.purpose === "REGISTRATION") {
                await this.otpService.delete(normalizedEmail);
            } else {
                await this.otpService.deletePasswordResetOtp(normalizedEmail);
            }

            throw new BadGatewayError("Failed to send verification email");
        }
    }
}