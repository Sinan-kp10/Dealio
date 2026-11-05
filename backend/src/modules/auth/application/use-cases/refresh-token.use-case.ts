import { IUserRepository } from "../../domain/repositories/user.repository";
import { JwtTokenService } from "../../infrastructure/security/jwt-token.service";
import { RefreshTokenService } from "../../infrastructure/security/refresh-token.service";
import { UnauthorizedError, ForbiddenError } from "../../../../shared/errors/app-error";
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
            throw new UnauthorizedError("Refresh token required.", "REFRESH_TOKEN_EXPIRED");
        }

        const payload = this.jwtTokenService.verifyRefreshToken(incomingToken);


        const isValidInRedis = await this.refreshTokenService.isValid(payload.userId, incomingToken);
        if (!isValidInRedis) {
            await this.refreshTokenService.remove(payload.userId);
            throw new UnauthorizedError("Invalid or expired session. Please log in again", "REFRESH_TOKEN_EXPIRED");
        }

        const user = await this.userRepository.findById(payload.userId);
        if (!user) {
            await this.refreshTokenService.remove(payload.userId);
            throw new UnauthorizedError("Account not found.", "UNAUTHENTICATED");
        }

        if (user.status === "SUSPENDED") {
            await this.refreshTokenService.remove(payload.userId);
            throw new ForbiddenError("Your account has been suspended by the administration.", "ACCOUNT_SUSPENDED");
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

