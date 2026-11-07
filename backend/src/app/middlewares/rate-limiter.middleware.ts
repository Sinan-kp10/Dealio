import rateLimit from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../shared/enums/http-status-code.enum";
import { createRedisRateLimitStore } from "../../infrastructure/database/redis/rate-limit-store";
import { env } from "../../config/env";

interface RateLimitOptions {
    windowMs: number;
    limit: number;
    prefix: string;
    skip?: (req: Request, res: Response) => boolean | Promise<boolean>;
}

const createRateLimiter = ({ windowMs, limit, prefix, skip }: RateLimitOptions) => {
    if (!env.isProduction) {
        return (_req: Request, _res: Response, next: NextFunction) => next();
    }

    return rateLimit({
        windowMs,
        limit,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        skip,
        store: createRedisRateLimitStore(`dealio:${prefix}:`),

        handler: (_req, res) => {
            res.status(HttpStatusCode.TOO_MANY_REQUESTS).json({
                status: false,
                message: "Too many requests. Please try again later",
                data: null
            });
        }
    });
};

export const globalRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    prefix: "global",
    skip: (req) => req.path === "/auth/me" || req.originalUrl === "/api/auth/me",
});

export const authLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    prefix: "auth",
});

export const otpRateLimiter = createRateLimiter({
    windowMs: 3 * 60 * 1000,
    limit: 5,
    prefix: "otp-verify",
})

export const resendOtpRateLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    limit: 3,
    prefix: "otp-resend",
});
