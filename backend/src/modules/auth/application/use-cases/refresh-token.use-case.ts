import { IUserRepository } from "../../domain/repositories/user.repository";
import { JwtTokenService } from "../../../../infrastructure/security/jwt-token.service";
import { RefreshTokenService } from "../../../../infrastructure/security/refresh-token.service";
import { AppError } from "../../../../shared/errors/app-error";
import { AuthUserDto } from "../dto/user.dto";
import type { IUseCase } from "../../../../shared/application/base.usecase";

export interface RefreshTokenResponseDto {
    accessToken: string;
    refreshToken: string;
    user: AuthUserDto;
}

export class RefreshTokenUseCase implements IUseCase<string | undefined, RefreshTokenResponseDto> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwtTokenService: JwtTokenService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    execute = async (incomingToken?: string): Promise<RefreshTokenResponseDto> => {
        if (!incomingToken) {
            throw new AppError("Refresh token required.", 401, "REFRESH_TOKEN_EXPIRED");
        }

        const payload = this.jwtTokenService.verifyRefreshToken(incomingToken);


        const isValidInRedis = await this.refreshTokenService.isValid(payload.userId, incomingToken);
        if (!isValidInRedis) {
            await this.refreshTokenService.remove(payload.userId);
            throw new AppError("Invalid or expired session. Please log in again", 401, "REFRESH_TOKEN_EXPIRED");
        }

        const user = await this.userRepository.findById(payload.userId);
        if (!user) {
            await this.refreshTokenService.remove(payload.userId);
            throw new AppError("Account not found.", 401, "UNAUTHENTICATED");
        }

        if (user.status === "SUSPENDED") {
            await this.refreshTokenService.remove(payload.userId);
            throw new AppError("Your account has been suspended by the administration.", 403, "ACCOUNT_SUSPENDED");
        }

        const newPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        const newAccessToken = this.jwtTokenService.generateAccessToken(newPayload);
        const newRefreshToken = this.jwtTokenService.generateRefreshToken(newPayload);

        await this.refreshTokenService.store(user.id, newRefreshToken);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    };
}

