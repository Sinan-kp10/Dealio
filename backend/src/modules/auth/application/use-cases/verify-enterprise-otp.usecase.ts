import { EnterpriseRepository } from "../../domain/repositories/enterprise.repository";
import { OtpService } from "../../../../infrastructure/security/otp.service";
import { AppError } from "../../../../shared/errors/app-error";
import { EnterpriseRegistrationData } from "../dto/register-enterprise.dto";


export class VerifyEnterpriseOtpuseCase {
    constructor(
        private readonly enterpriseRepository : EnterpriseRepository,
        private readonly otpService : OtpService
    ){}

    execute = async(email : string, otp : string) => {

        const normalizedEmail = email.trim().toLowerCase()

        const result = await this.otpService.verify(normalizedEmail, otp)

        if (result === "invalid") {
            throw new AppError("Invalid OTP. Please try again.", 400);
        }

        if(result === "expired"){
            throw new AppError("OTP has expired. Please request a new one.", 400)
        }

        const registrationData = await this.otpService.getRegistrationData<EnterpriseRegistrationData>(normalizedEmail)
        if (!registrationData) {
            throw new AppError("Registration data has expired. Please sign up again.",400)
        }

        const existingUser = await this.enterpriseRepository.findUserByEmail(normalizedEmail)
        if (existingUser) {
            await this.otpService.delete(normalizedEmail);
            throw new AppError("Email is already registered", 409);
        }

        return this.enterpriseRepository.create({
            companyName: registrationData.companyName.trim(),
            contactPersonName: registrationData.contactPersonName.trim(),
            email : normalizedEmail,
            passwordHash : registrationData.passwordHash,
            phone: registrationData.phone.trim(),
            role: "ENTERPRISE_MANAGER",
            emailVerified: true,
        });


    }
}