

import type { IUserRepository,} from "../../domain/repositories/user.repository";
import type {RegisterCustomerDto,} from "../dto/register-customer.dto";
import { AppError } from "../../../../shared/errors/app-error";
import { PasswordService } from "../../../../infrastructure/security/password.service";
import { OtpService } from "../../../../infrastructure/security/otp.service";
import { EmailService } from "../../../../infrastructure/email/email.service";

export class RegisterCustomerUseCase {

    constructor( 
        private readonly userRepository: IUserRepository,
        private readonly passwordService : PasswordService,
        private readonly otpService : OtpService,
        private readonly emailService : EmailService

    ) {}

    execute = async (data: RegisterCustomerDto): Promise<void> => {

        const email = data.email.trim().toLowerCase();

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            throw new AppError("Email is already registered", 409)
        }

        const passwordHash = await this.passwordService.hash(data.password)

        const registrationData = {
            name: data.name.trim(),
            email,
            passwordHash,
        };

        const otp = await this.otpService.generateAndStore(email, registrationData)

        try {
            await this.emailService.sendOtp(email,otp)
            
        } catch{
            await this.otpService.delete(email);

            throw new AppError("Failed to send verification email", 502);
        }

    }
}
