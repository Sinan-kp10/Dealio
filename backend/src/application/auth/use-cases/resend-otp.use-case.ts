import { EmailService } from "../../../infrastructure/email/email.service";
import { OtpService } from "../../../infrastructure/security/otp.service";
import { AppError } from "../../../shared/errors/app-error";
import { ResendOtpDto } from "../dto/resend-otp.dto";

export class ResendOtpUseCase {
    constructor(
        private readonly otpService: OtpService,
        private readonly emailService: EmailService,
    ) {}

    execute = async(dto : ResendOtpDto) : Promise<void> => {

        const normalizedEmail = dto.email.trim().toLowerCase()

        const otp = await this.otpService.resend(normalizedEmail)

        try {
        
            await this.emailService.sendOtp(normalizedEmail,otp)
            
        } catch{

            await this.otpService.delete(normalizedEmail);

            throw new AppError("Failed to send verification email", 502);
        }
    }
}