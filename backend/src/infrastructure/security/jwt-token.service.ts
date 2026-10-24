import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "../../shared/errors/app-error";

export interface JwtPayload {
    userId: string;
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

    generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
        });
    }
}