export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export interface IJwtTokenService {
    generateAccessToken(payload: JwtPayload): string;
    verifyAccessToken(token: string): JwtPayload;
    generateRefreshToken(payload: JwtPayload): string;
    verifyRefreshToken(token: string): JwtPayload;
    generatePasswordResetToken(email: string): string;
    verifyPasswordResetToken(token: string): { email: string };
}

