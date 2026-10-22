
import type { User } from "../../../domain/auth/entities/user.entity";
import type { UserRepository,} from "../../../domain/auth/repositories/user.repository";
import type {RegisterCustomerDto,} from "../dto/register-customer.dto";
import { AppError } from "../../../shared/errors/app-error";
import { PasswordService } from "../../../infrastructure/security/password.service";

export class RegisterCustomerUseCase {

    constructor( 
        private readonly userRepository: UserRepository,
        private readonly passwordService : PasswordService

    ) {}

    execute = async (data: RegisterCustomerDto): Promise<User> => {

        const email = data.email.trim().toLowerCase();

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            throw new AppError("Email is already registered", 409)
        }

        const passwordHash = await this.passwordService.hash(data.password)

        return this.userRepository.create({
            name: data.name.trim(),
            email,
            passwordHash,
            role: "CUSTOMER",
            enterprise_id: null,
            phone : null,
            status: "ACTIVE",
        })
    }
}
