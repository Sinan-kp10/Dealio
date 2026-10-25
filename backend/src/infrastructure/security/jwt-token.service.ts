import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "../../shared/errors/app-error";
import crypto from "node:crypto";

export interface JwtPayload {
    userId: string;
    email : string
    role: string;
}

export class JwtTokenService {
    private readonly secret: string;
    private readonly expiresIn: SignOptions["expiresIn"]

    constructor() {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new AppError("JWT_SECRET is not configured.",500);
        }

        this.secret = secret;
        this.expiresIn = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];
    }

    generateAccessToken = (payload: JwtPayload): string => {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
        });
    }

    verifyAccessToken = (token: string): JwtPayload => {
        try {
            const decoded = jwt.verify(token, this.secret);

            if(typeof decoded === "string" || typeof decoded.userId !== "string" || typeof decoded.email !== "string" || typeof decoded.role !== "string"){
                throw new AppError("Invalid access token.", 401);
            }

            return {
                userId: decoded.userId,
                email : decoded.email,
                role: decoded.role,
            }

        } catch (error) {
            
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Invalid or expired access token.", 401);
        }
    }

    generatePasswordResetToken = (email:string) : string => {

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
        )
    }

    verifyPasswordResetToken = (token: string): { email: string } => {
        try {
            const decoded = jwt.verify(token, this.secret);

            if(typeof decoded === "string" || typeof decoded.email !== "string" || decoded.purpose !== "password-reset" || typeof decoded.jti !== "string"){

                throw new AppError("Invalid password reset token.", 401);
            }

            return { email: decoded.email };
            
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Invalid or expired password reset token.", 401);
        }
    }
}