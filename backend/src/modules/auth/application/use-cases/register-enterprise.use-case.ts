import { PasswordService } from "../../infrastructure/security/password.service";
import { RegisterEnterpriseDto } from "../dto/register-enterprise.dto";
import { IEnterpriseRepository } from "../../domain/repositories/enterprise.repository";
import { ConflictError, BadGatewayError } from "../../../../shared/errors/app-error";
import { OtpService } from "../../infrastructure/security/otp.service";
import { EmailService } from "../../../../infrastructure/email/email.service";

import type { IUseCase } from "../../../../shared/application/base.usecase";

export class RegisterEnterpriseUseCase implements IUseCase<RegisterEnterpriseDto, void> {
    constructor(
        private readonly enterpriseRepository : IEnterpriseRepository,
        private readonly passwordService : PasswordService,
        private readonly otpService : OtpService,
        private readonly emailService : EmailService
    ){}

    execute = async (input : RegisterEnterpriseDto) => {

        const email = input.email.trim().toLowerCase();

        const emailExist = await this.enterpriseRepository.findUserByEmail(email)

        if (emailExist){
            throw new ConflictError("Email is already registered", "email");
        }

        if (input.phone) {
            const phone = input.phone.trim();
            const phoneVerified = await this.enterpriseRepository.isPhoneVerified(phone);
            if (phoneVerified) {
                throw new ConflictError("Phone number is already registered and verified", "phone");
            }
        }

        const passwordHash = await this.passwordService.hash(input.password)

        const registrationData = {
            enterpriseName: input.enterpriseName.trim(),
            contactPersonName : input.contactPersonName,
            email : input.email,
            phone : input.phone,
            passwordHash,
        }

        const otp = await this.otpService.generateAndStore(email, registrationData)

        try {

            await this.emailService.sendOtp(email,otp)
            
        } catch{

            await this.otpService.delete(email);

            throw new BadGatewayError("Failed to send verification email");
        }

    }


}