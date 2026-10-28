import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors/app-error";

export const requireRole = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.auth) {
            throw new AppError("Authentication required.", 401);
        }

        if (!allowedRoles.includes(req.auth.role)) {
            throw new AppError("Access denied. Insufficient permissions.", 403);
        }

        next();
    };
};

