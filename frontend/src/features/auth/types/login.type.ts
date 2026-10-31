import type { AuthUser } from "./auth.types"

export interface LoginFromData {
    email : string
    password : string
}

export interface LoginRequest {
    email : string
    password : string
}

export interface LoginResponse {
    status: boolean;
    message: string
    data: {
        user: AuthUser;
    };
}

export interface LogoutResponse {
    status: boolean;
    message: string;
}