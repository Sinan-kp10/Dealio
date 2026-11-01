import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadGatewayError, NotFoundError } from "../../../../shared/errors/app-error";
import { EmailService } from "../../../../infrastructure/email/email.service";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { ResendEmailChangeOtpDto } from "../dto/change-email.dto";

export class ResendEmailChangeOtpUseCase implements IUseCase<ResendEmailChangeOtpDto, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: OtpService,
        private readonly emailService: EmailService
    ) {}

    execute = async (dto: ResendEmailChangeOtpDto): Promise<void> => {
        const user = await this.userRepository.findById(dto.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const { otp, newEmail } = await this.otpService.resendEmailChangeOtp(dto.userId);

        try {
            await this.emailService.sendOtp(newEmail, otp);
        } catch {
            throw new BadGatewayError("Failed to resend verification email");
        }
    };
}

