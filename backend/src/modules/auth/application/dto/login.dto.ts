import { AuthUserDto } from "./user.dto";

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    accessToken: string;
    user: AuthUserDto;
}