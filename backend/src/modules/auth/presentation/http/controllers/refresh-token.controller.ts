import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { RefreshTokenResponseDto } from "../../../application/use-cases/refresh-token.use-case";
import type { IApiResponse } from "../../../../../shared/application/api-response";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum.js";
import { env } from "../../../../../config/env.js";

export class RefreshTokenController {
    constructor(private readonly refreshTokenUseCase: IUseCase<string | undefined, RefreshTokenResponseDto>) {}

    refresh = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const incomingToken = req.cookies?.refreshToken;

            const result = await this.refreshTokenUseCase.execute(incomingToken);

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

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Token refreshed successfully.",
                data: {
                    user: result.user,
                },
            });
        } catch (error) {
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

            next(error);
        }
    };
}
