import { IEnterpriseRepository, type CreatedEnterpriseResult } from "../../domain/repositories/enterprise.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { BadRequestError, ConflictError } from "../../../../shared/errors/app-error";
import { EnterpriseRegistrationData } from "../dto/register-enterprise.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class VerifyEnterpriseOtpuseCase implements IUseCase<VerifyOtpDto, CreatedEnterpriseResult> {
    constructor(
        private readonly enterpriseRepository : IEnterpriseRepository,
        private readonly otpService : OtpService
    ){}

    execute = async (dto: VerifyOtpDto): Promise<CreatedEnterpriseResult> => {
        const normalizedEmail = dto.email.trim().toLowerCase();

        const result = await this.otpService.verify(normalizedEmail, dto.otp);

        if (result === "invalid") {
            throw new BadRequestError("Invalid OTP. Please try again.");
        }

        if(result === "expired"){
            throw new BadRequestError("OTP has expired. Please request a new one.")
        }

        const registrationData = await this.otpService.getRegistrationData<EnterpriseRegistrationData>(normalizedEmail)
        if (!registrationData) {
            throw new BadRequestError("Registration data has expired. Please sign up again.")
        }

        const existingUser = await this.enterpriseRepository.findUserByEmail(normalizedEmail)
        if (existingUser) {
            await this.otpService.delete(normalizedEmail);
            throw new ConflictError("Email is already registered");
        }

        return this.enterpriseRepository.create({
            enterpriseName: registrationData.enterpriseName.trim(),
            contactPersonName: registrationData.contactPersonName.trim(),
            email : normalizedEmail,
            passwordHash : registrationData.passwordHash,
            phone: registrationData.phone.trim(),
            role: "ENTERPRISE_MANAGER",
            emailVerified: true,
        });
    };
}
