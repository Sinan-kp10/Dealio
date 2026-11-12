import { IUserRepository } from "../../domain/repositories/user.repository";
import type { IJwtTokenService } from "../../../../shared/interfaces/IJwtTokenService";
import type { IPasswordService } from "../../../../shared/interfaces/IPasswordService";
import type { IRefreshTokenService } from "../../../../shared/interfaces/IRefreshTokenService";
import { UnauthorizedError, ForbiddenError } from "../../../../shared/errors/app-error";
import { LoginDto, LoginResponseDto } from "../dto/login.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class LoginUseCase implements IUseCase<LoginDto, LoginResponseDto> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordService: IPasswordService,
        private readonly jwtTokenService: IJwtTokenService,
        private readonly refreshTokenService: IRefreshTokenService
    ) {}

    execute = async (input : LoginDto): Promise<LoginResponseDto> => {
        const normalizedEmail = input.email.trim().toLowerCase();

        const user = await this.userRepository.findByEmail(normalizedEmail);

        if (!user) {
            throw new UnauthorizedError("Invalid email or password.", "INVALID_CREDENTIALS", "password");
        }

        const isPasswordValid = await this.passwordService.verify(input.password, user.password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password.", "INVALID_CREDENTIALS", "password");
        }

        if (user.status === "SUSPENDED") {
            throw new ForbiddenError("Your account has been suspended by the administration", "ACCOUNT_SUSPENDED");
        }

        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtTokenService.generateAccessToken(payload);
        const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

        await this.refreshTokenService.store(user.id, refreshToken);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                phoneVerified: user.phone_verified ?? false,
            },
        };
    };
}
