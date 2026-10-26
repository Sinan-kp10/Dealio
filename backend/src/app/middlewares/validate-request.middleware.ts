import type { Request, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../shared/errors/app-error"; 

export const validateRequest = ( schema: z.ZodType,source: "body" | "query" | "params" = "body",): RequestHandler => {
    return (req : Request, _res , next : NextFunction): void => {

        const input = req[source];
        const result = schema.safeParse(input);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            next(new AppError(JSON.stringify(errors), 400));
            return;
        }

        if (source === "body") {
            req.body = result.data;
        }

        next();
    };
};