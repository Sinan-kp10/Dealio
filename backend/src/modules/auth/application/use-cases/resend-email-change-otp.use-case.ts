import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadGatewayError, NotFoundError } from "../../../../shared/errors/app-error";
import type { IEmailService } from "../../../../shared/interfaces/IEmailService";
import { IUserRepository } from "../../domain/repositories/user.repository";
import type { IOtpService } from "../../../../shared/interfaces/IOtpService";
import { ResendEmailChangeOtpDto } from "../dto/change-email.dto";

export class ResendEmailChangeOtpUseCase implements IUseCase<ResendEmailChangeOtpDto, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: IOtpService,
        private readonly emailService: IEmailService
    ) {}

    execute = async (input : ResendEmailChangeOtpDto): Promise<void> => {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const { otp, newEmail } = await this.otpService.resendEmailChangeOtp(input.userId);

        try {
            await this.emailService.sendOtp(newEmail, otp);
        } catch {
            throw new BadGatewayError("Failed to resend verification email");
        }
    };
}

