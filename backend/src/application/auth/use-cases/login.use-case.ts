import { UserRepository } from "../../../domain/auth/repositories/user.repository";
import { JwtTokenService } from "../../../infrastructure/security/jwt-token.service";
import { PasswordService } from "../../../infrastructure/security/password.service";
import { AppError } from "../../../shared/errors/app-error";
import { LoginDto } from "../dto/login.dto";

export class LoginUseCase {
    constructor(
        private readonly userRepositury : UserRepository,
        private readonly passwordService : PasswordService,
        private readonly jwtTokenService : JwtTokenService

    ){}

    execute = async(dto : LoginDto) => {

        const normalizedEmail = dto.email.trim().toLowerCase()

        const user = await this.userRepositury.findByEmail(normalizedEmail)

        if(!user){
            throw new AppError("Invalid email or password.", 401)
        }

        const isPasswordValid = await this.passwordService.verify(dto.password, user.password_hash)

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password.", 401);
        }

        if (user.status === "SUSPENDED") {
            throw new AppError("Your account has been suspended by the administration.",403);
        }

        const accessToken = this.jwtTokenService.generateAccessToken({
            userId : user.id,
            email : user.email,
            role : user.role

        })

        return {
            accessToken,
            user: {
                id : user.id,
                email: user.email,
                role: user.role,
            },
        };
    } 
}