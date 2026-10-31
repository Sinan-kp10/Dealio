import { EmailDto } from "../dto/email.dto";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { AppError } from "../../../../shared/errors/app-error";
import { EmailService } from "../../../../infrastructure/email/email.service";

import type { IUseCase } from "../../../../shared/application/base.usecase";

export class ForgotPasswordUseCase implements IUseCase<EmailDto, void> {
    constructor(
        private readonly userRepository: IUserRepository,
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