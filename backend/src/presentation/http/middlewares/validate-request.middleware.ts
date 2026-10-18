import type { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../../shared/errors/app-error";


export const validateRequest = (schema: z.ZodType): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            next(new AppError(JSON.stringify(errors), 400));
            return;
        }

        req.body = result.data;
        next();
    };
};