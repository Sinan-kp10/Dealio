import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { jwtTokenService } from "../../../infrastructure/container/infrastructure.container";

export const authMiddleware = (req : Request, res : Response, next : NextFunction): void => {

    try {

        const token = req.cookies?.accessToken

        if (!token) {
            throw new AppError("Authentication required.", 401);
        }

        const payload = jwtTokenService.verifyAccessToken(token);

        req.auth = payload

        next();
        
    } catch (error) {

        if (error instanceof AppError) {
            next(error);
            return;
        }

        next(new AppError("Invalid or expired access token.", 401));
    }
}