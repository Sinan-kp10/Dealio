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
    data? : {
        accessToken : string,
        user: {
            id : string
            email: string
            role: "CUSTOMER" | "ENTERPRISE_MANAGER" | "ADMIN"
        }
    }
}