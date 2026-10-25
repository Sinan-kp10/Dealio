export interface LoginFromData {
    email : string
    password : string
}

export interface LoginRequest {
    email : string
    password : string
}

export type UserRole = "ADMIN" | "ENTERPRISE_MANAGER" | "CUSTOMER";

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}

export interface LoginResponse {
    success: "success"
    message: string
    data: {
        accessToken : string,
        user: AuthUser
    }
}

export interface LogoutResponse {
    email : string
    password : string
}