import { PasswordService } from "../../../infrastructure/security/password.service";
import { RegisterEnterpriseDto } from "../dto/register-enterprise.dto";
import { EnterpriseRepository } from "../../../domain/auth/repositories/enterprise.repository";
import { AppError } from "../../../shared/errors/app-error";

export class  RegisterEnterpriseUseCase {
    constructor(
        private readonly enterpriseRepository : EnterpriseRepository,
        private readonly passwordService : PasswordService
    ){}

    execute = async (data : RegisterEnterpriseDto) => {

        const email = data.email.trim().toLowerCase();

        const emailExist = await this.enterpriseRepository.findUserByEmail(email)

        if (emailExist){
            throw new AppError("Email is already registered", 409);
        }

        const passwordHash = await this.passwordService.hash(data.password)

        return this.enterpriseRepository.create({
            companyName: data.companyName.trim(),
            contactPersonName: data.contactPersonName.trim(),
            email,
            passwordHash,
            phone: data.phone.trim(),
        });

    }


}