import type { Response } from "express";
import { HttpStatusCode } from "../enums/http-status-code.enum.js";

export interface IApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export function sendResponse<T>( res: Response, message: string, data?: T, statusCode: HttpStatusCode = HttpStatusCode.OK): void {
    const response: IApiResponse<T> = {
        success: true,
        message,
    };

    if (data !== undefined) {
        response.data = data;
    }

    res.status(statusCode).json(response);
}

