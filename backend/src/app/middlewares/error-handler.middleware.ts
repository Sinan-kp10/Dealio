import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../../shared/errors/app-error.js"; 
import { HttpStatusCode } from "../../shared/presentation/enums/http-status-code.enum.js";

export const errorHandler: ErrorRequestHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: false,
            message: error.message,
            ...(error.errorCode && { errorCode: error.errorCode }),
        });
        return;
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Something went wrong.",
    });
};
