import { EmailDto } from "../dto/email.dto";
import { UserRepository } from "../../../domain/auth/repositories/user.repository";
import { OtpService } from "../../../infrastructure/security/otp.service";
import { EmailService } from "../../../infrastructure/email/email.service";
import { AppError } from "../../../shared/errors/app-error";

export class ForgotPasswordUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly otpService: OtpService,
        private readonly emailService: EmailService,
    ) {}

    execute = async (dto: EmailDto): Promise<void> => {

        const email = dto.email.trim().toLowerCase();
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email not registered", 404);
            
        }

        const otp = await this.otpService.generatePasswordResetOtp(email)

        try {
            await this.emailService.sendOtp(email,otp)
            
        } catch{
            await this.otpService.delete(email);
            throw new AppError("Failed to send verification email", 502);
        }
    }
}