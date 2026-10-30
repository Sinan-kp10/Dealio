import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../../../infrastructure/security/otp.service";
import { AppError } from "../../../../shared/errors/app-error";
import { CustomerRegistrationData } from "../dto/register-customer.dto";
import { AuthUserDto } from "../dto/user.dto";

export class VerifyCustomerOtpuseCase {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly otpService : OtpService
    ){}

    execute = async (email: string, otp : string) : Promise<AuthUserDto> => {
        const normalizedEmail = email.trim().toLowerCase();

        const result = await this.otpService.verify(normalizedEmail,otp)

        if (result === "invalid") {
            throw new AppError("Invalid OTP. Please try again", 400);
        }

        if(result === "expired"){
            throw new AppError("OTP has expired. Please request a new one", 400)
        }

        const registrationData = await this.otpService.getRegistrationData<CustomerRegistrationData>(normalizedEmail)
        if (!registrationData) {
            throw new AppError("Registration data has expired. Please sign up again.",400)
        }

        const existingUser = await this.userRepository.findByEmail(normalizedEmail);

        if (existingUser) {
            await this.otpService.delete(normalizedEmail);
            throw new AppError("Email is already registered", 409);
        }

        const user = await this.userRepository.create({
            name: registrationData.name,
            email: normalizedEmail,
            passwordHash: registrationData.passwordHash,
            role: "CUSTOMER",
            enterprise_id: null,
            phone: null,
            emailVerified: true,
        });

        await this.otpService.delete(normalizedEmail);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    };
}
