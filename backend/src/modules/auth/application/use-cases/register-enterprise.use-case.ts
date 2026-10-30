import { PasswordService } from "../../../../infrastructure/security/password.service";
import { RegisterEnterpriseDto } from "../dto/register-enterprise.dto";
import { IEnterpriseRepository } from "../../domain/repositories/enterprise.repository";
import { AppError } from "../../../../shared/errors/app-error";
import { OtpService } from "../../../../infrastructure/security/otp.service";
import { EmailService } from "../../../../infrastructure/email/email.service";

export class  RegisterEnterpriseUseCase {
    constructor(
        private readonly enterpriseRepository : IEnterpriseRepository,
        private readonly passwordService : PasswordService,
        private readonly otpService : OtpService,
        private readonly emailService : EmailService
    ){}

    execute = async (data : RegisterEnterpriseDto) => {

        const email = data.email.trim().toLowerCase();

        const emailExist = await this.enterpriseRepository.findUserByEmail(email)

        if (emailExist){
            throw new AppError("Email is already registered", 409);
        }

        const passwordHash = await this.passwordService.hash(data.password)

        const registrationData = {
            companyName: data.companyName.trim(),
            contactPersonName : data.contactPersonName,
            email : data.email,
            phone : data.phone,
            passwordHash,
        }

        const otp = await this.otpService.generateAndStore(email, registrationData)

        try {

            await this.emailService.sendOtp(email,otp)
            
        } catch{

            await this.otpService.delete(email);

            throw new AppError("Failed to send verification email", 502);
        }

    }


}