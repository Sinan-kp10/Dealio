import type { IOtpService } from "../../../../shared/interfaces/IOtpService";
import { BadGatewayError } from "../../../../shared/errors/app-error";
import { ResendOtpInput } from "../dto/verify-otp.dto";
import type { IEmailService } from "../../../../shared/interfaces/IEmailService";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class ResendOtpUseCase implements IUseCase<ResendOtpInput, void> {
    constructor(
        private readonly otpService: IOtpService,
        private readonly emailService: IEmailService,
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