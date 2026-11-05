import { HttpStatusCode } from "../enums/http-status-code.enum.js";

export interface FieldError {
    field: string;
    message: string;
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: "fail" | "error";
    public readonly isOperational: boolean;
    public readonly errorCode?: string;
    public readonly field?: string;
    public readonly errors?: FieldError[];

    constructor(
        message: string,
        statusCode: number,
        errorCode?: string,
        field?: string,
        errors?: FieldError[]
    ) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.errorCode = errorCode;
        this.field = field;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(errors: FieldError[]) {
        const primaryError = errors[0];
        super(
            primaryError?.message ?? "Validation failed",
            HttpStatusCode.BAD_REQUEST,
            "VALIDATION_ERROR",
            primaryError?.field,
            errors
        );
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, field?: string, errorCode?: string) {
        super(message, HttpStatusCode.BAD_REQUEST, errorCode, field);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string, errorCode?: string, field?: string) {
        super(message, HttpStatusCode.UNAUTHORIZED, errorCode, field);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string, errorCode?: string, field?: string) {
        super(message, HttpStatusCode.FORBIDDEN, errorCode, field);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, field?: string, errorCode?: string) {
        super(message, HttpStatusCode.NOT_FOUND, errorCode, field);
    }
}

export class ConflictError extends AppError {
    constructor(message: string, field?: string, errorCode?: string) {
        super(message, HttpStatusCode.CONFLICT, errorCode, field);
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
