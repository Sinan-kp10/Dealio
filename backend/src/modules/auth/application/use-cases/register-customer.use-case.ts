import type { IUserRepository } from "../../domain/repositories/user.repository";
import type { RegisterCustomerDto } from "../dto/register-customer.dto";
import { ConflictError, BadGatewayError } from "../../../../shared/errors/app-error";
import type { IPasswordService } from "../../../../shared/interfaces/IPasswordService";
import type { IOtpService } from "../../../../shared/interfaces/IOtpService";
import type { IEmailService } from "../../../../shared/interfaces/IEmailService";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class RegisterCustomerUseCase implements IUseCase<RegisterCustomerDto, void> {

    constructor( 
        private readonly userRepository: IUserRepository,
        private readonly passwordService: IPasswordService,
        private readonly otpService: IOtpService,
        private readonly emailService: IEmailService

    ) {}

    execute = async (input : RegisterCustomerDto): Promise<void> => {

        const email = input.email.trim().toLowerCase();

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            throw new ConflictError("Email is already registered", "email")
        }

        const passwordHash = await this.passwordService.hash(input.password)

        const registrationData = {
            name: input.name.trim(),
            email,
            passwordHash,
        };

        const otp = await this.otpService.generateAndStore(email, registrationData)

        try {
            await this.emailService.sendOtp(email,otp)
            
        } catch{
            await this.otpService.delete(email);

            throw new BadGatewayError("Failed to send verification email");
        }

    }
}
