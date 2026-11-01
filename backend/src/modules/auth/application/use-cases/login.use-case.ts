import { IUserRepository } from "../../domain/repositories/user.repository";
import { JwtTokenService } from "../../infrastructure/security/jwt-token.service";
import { PasswordService } from "../../infrastructure/security/password.service";
import { RefreshTokenService } from "../../infrastructure/security/refresh-token.service";
import { UnauthorizedError, ForbiddenError } from "../../../../shared/errors/app-error";
import { LoginDto, LoginResponseDto } from "../dto/login.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export class LoginUseCase implements IUseCase<LoginDto, LoginResponseDto> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordService: PasswordService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    execute = async (dto: LoginDto): Promise<LoginResponseDto> => {
        const normalizedEmail = dto.email.trim().toLowerCase();

        const user = await this.userRepository.findByEmail(normalizedEmail);

        if (!user) {
            throw new UnauthorizedError("Invalid email or password.");
        }

        const isPasswordValid = await this.passwordService.verify(dto.password, user.password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password.");
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
            },
        };
    };
}
