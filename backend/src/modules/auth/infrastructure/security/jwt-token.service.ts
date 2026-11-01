import jwt, { type SignOptions, TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/app-error";
import crypto from "node:crypto";
import { env } from "../../../../config/env.js";

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export class JwtTokenService {
    private readonly secret: string;
    private readonly accessExpiresIn: SignOptions["expiresIn"];
    private readonly refreshExpiresIn: SignOptions["expiresIn"];

    constructor() {
        this.secret = env.jwt.secret;
        this.accessExpiresIn = env.jwt.accessExpiresIn as SignOptions["expiresIn"];
        this.refreshExpiresIn = env.jwt.refreshExpiresIn as SignOptions["expiresIn"];
    }

    generateAccessToken = (payload: JwtPayload): string => {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.accessExpiresIn,
        });
    };

    verifyAccessToken = (token: string): JwtPayload => {
        try {
            const decoded = jwt.verify(token, this.secret);

            if(typeof decoded === "string" || typeof decoded.userId !== "string" || typeof decoded.email !== "string" || typeof decoded.role !== "string"){
                throw new AppError("Invalid access token.", 401);
            }

            return {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error instanceof TokenExpiredError) {
                throw new AppError("Access token expired.", 401, "TOKEN_EXPIRED");
            }

            throw new AppError("Invalid access token.", 401, "UNAUTHENTICATED");
        }
    };

    generateRefreshToken = (payload: JwtPayload): string => {
        return jwt.sign(
            {
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
            },
            this.secret,
            {
                expiresIn: this.refreshExpiresIn,
                jwtid: crypto.randomUUID(),
            }
        );
    };

    verifyRefreshToken = (token: string): JwtPayload => {
        try {
            const decoded = jwt.verify(token, this.secret);

            if (
                typeof decoded === "string" ||
                typeof decoded.userId !== "string" ||
                typeof decoded.email !== "string" ||
                typeof decoded.role !== "string"
            ) {
                throw new AppError("Invalid refresh token.", 401, "UNAUTHENTICATED");
            }

            return {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error instanceof TokenExpiredError) {
                throw new AppError("Refresh token expired.", 401, "REFRESH_TOKEN_EXPIRED");
            }

            throw new AppError("Invalid refresh token.", 401, "UNAUTHENTICATED");
        }
    };

    generatePasswordResetToken = (email: string): string => {
        return jwt.sign(
            {
                email,
                purpose: "password-reset",
            },
            this.secret,
            {
                expiresIn: "5m",
                jwtid: crypto.randomUUID(),
            }
        );
    };

    verifyPasswordResetToken = (token: string): { email: string } => {
        try {
            const decoded = jwt.verify(token, this.secret);

            if (
                typeof decoded === "string" ||
                typeof decoded.email !== "string" ||
                decoded.purpose !== "password-reset" ||
                typeof decoded.jti !== "string"
            ) {
                throw new AppError("Invalid password reset token.", 401);
            }

            return { email: decoded.email };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Invalid or expired password reset token.", 401);
        }
    };
}
