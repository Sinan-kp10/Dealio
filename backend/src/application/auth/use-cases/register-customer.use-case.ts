
import type { User } from "../../../domain/auth/entities/user.entity";
import type { UserRepository,} from "../../../domain/auth/repositories/user.repository";
import type {RegisterCustomerDto,} from "../dto/register-customer.dto";
import { AppError } from "../../../shared/errors/app-error";
import { passwordService } from "../../../infrastructure/security/index";

export class RegisterCustomerUseCase {

    constructor( private readonly userRepository: UserRepository) {}

    execute = async (data: RegisterCustomerDto): Promise<User> => {

        const email = data.email.trim().toLowerCase();

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            throw new AppError("Email is already registered", 409)
        }

        const password_hash = await passwordService.hash(data.password)

        return this.userRepository.create({
            name: data.name.trim(),
            email,
            password_hash,
            role: "CUSTOMER",
            enterprise_id: null,
            phone: data.phone?.trim() || null,
        })
    }
}
