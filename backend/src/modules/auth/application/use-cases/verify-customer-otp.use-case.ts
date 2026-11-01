import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { BadRequestError, ConflictError } from "../../../../shared/errors/app-error";
import { CustomerRegistrationData } from "../dto/register-customer.dto";
import { AuthUserDto } from "../dto/user.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class VerifyCustomerOtpuseCase implements IUseCase<VerifyOtpDto, AuthUserDto> {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly otpService : OtpService
    ){}

    execute = async (dto: VerifyOtpDto): Promise<AuthUserDto> => {
        const normalizedEmail = dto.email.trim().toLowerCase();

        const result = await this.otpService.verify(normalizedEmail, dto.otp);

        if (result === "invalid") {
            throw new BadRequestError("Invalid OTP. Please try again");
        }

        if(result === "expired"){
            throw new BadRequestError("OTP has expired. Please request a new one")
        }

        const registrationData = await this.otpService.getRegistrationData<CustomerRegistrationData>(normalizedEmail)
        if (!registrationData) {
            throw new BadRequestError("Registration data has expired. Please sign up again.")
        }

        const existingUser = await this.userRepository.findByEmail(normalizedEmail);

        if (existingUser) {
            await this.otpService.delete(normalizedEmail);
            throw new ConflictError("Email is already registered");
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
