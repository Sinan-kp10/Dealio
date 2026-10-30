import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors/app-error"; 
import { jwtTokenService } from "../../modules/auth/infrastructure/container/infrastructure.container"; 
import { prisma } from "../../infrastructure/database/prisma/prisma-client";
import { env } from "../../config/env.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {

        const token = req.cookies?.accessToken;

        if (!token) {
            if (req.cookies?.refreshToken) {
                throw new AppError("Access token expired.", 401, "TOKEN_EXPIRED");
            }
            throw new AppError("Authentication required.", 401, "UNAUTHENTICATED");
        }

        const payload = jwtTokenService.verifyAccessToken(token);

        const user = await prisma.users.findUnique({
            where: { id: payload.userId },
            select: { status: true },
        });

        if (!user) {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: env.isProduction,
                sameSite: "lax",
                path: "/",
            });
            throw new AppError("Account not found.", 401, "UNAUTHENTICATED");
        }

        if (user.status === "SUSPENDED") {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: env.isProduction,
                sameSite: "lax",
                path: "/",
            });
            throw new AppError("Your account has been suspended by the administration.",403,"ACCOUNT_SUSPENDED")
        }

        req.auth = payload;

        next();
        
    } catch (error) {

        if (error instanceof AppError) {
            next(error);
            return;
        }

        next(new AppError("Invalid or expired access token.", 401, "UNAUTHENTICATED"));
    }
};
