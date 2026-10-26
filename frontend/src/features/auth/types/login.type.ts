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
    success: "success"
    message: string
    data: {
        user: AuthUser;
    };
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}