import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase"; 
import type { LoginDto, LoginResponseDto } from "../../../application/dto/login.dto"; 
import { sendResponse } from "../../../../../shared/presentation/api-response";
import type { IRefreshTokenService } from "../../../../../shared/interfaces/IRefreshTokenService.js";
import { env } from "../../../../../config/env.js";

export class LoginController {

    constructor(
        private readonly loginUseCase: IUseCase<LoginDto, LoginResponseDto>,
        private readonly refreshTokenService: IRefreshTokenService
    ) {}

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as LoginDto;

            const result = await this.loginUseCase.execute(data);

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: env.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: env.auth.accessTokenMaxAgeMs,
            });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: env.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: env.auth.refreshTokenMaxAgeMs,
            });

            sendResponse(res, "Login successful", {
                user: result.user,
            });
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            if (userId) {
                await this.refreshTokenService.remove(userId);
            }

            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: env.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
            });

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: env.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
            });

            sendResponse(res, "Logged out successfully.");
        } catch (error) {
            next(error);
        }
    };
}
