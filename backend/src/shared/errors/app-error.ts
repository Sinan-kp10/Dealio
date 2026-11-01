import { HttpStatusCode } from "../enums/http-status-code.enum.js";

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: "fail" | "error";
    public readonly isOperational: boolean;
    public readonly errorCode?: string;

    constructor(message: string, statusCode: number, errorCode?: string) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.errorCode = errorCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.BAD_REQUEST, errorCode);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.UNAUTHORIZED, errorCode);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.FORBIDDEN, errorCode);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.NOT_FOUND, errorCode);
    }
}

export class ConflictError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.CONFLICT, errorCode);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.INTERNAL_SERVER_ERROR, errorCode);
    }
}

export class BadGatewayError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(message, HttpStatusCode.BAD_GATEWAY, errorCode);
    }
}
