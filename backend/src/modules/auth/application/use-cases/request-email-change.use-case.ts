import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadGatewayError, ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { EmailService } from "../../../../infrastructure/email/email.service";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { RequestEmailChangeDto } from "../dto/change-email.dto";

export class RequestEmailChangeUseCase implements IUseCase<RequestEmailChangeDto, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: OtpService,
        private readonly emailService: EmailService
    ) {}

    execute = async (input : RequestEmailChangeDto): Promise<void> => {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const normalizedEmail = input.newEmail.trim().toLowerCase();

        if (user.email === normalizedEmail) {
            throw new ConflictError("New email must be different from current email", "newEmail");
        }

        const emailExists = await this.userRepository.findByEmail(normalizedEmail);

        if (emailExists) {
            throw new ConflictError("Email is already registered", "newEmail");
        }

        const otp = await this.otpService.generateEmailChangeOtp(input.userId, normalizedEmail);

        try {
            await this.emailService.sendOtp(normalizedEmail, otp);
        } catch {
            await this.otpService.deleteEmailChangeOtp(input.userId);
            throw new BadGatewayError("Failed to send verification email");
        }
    };
}

