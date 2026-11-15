export interface IRefreshTokenService {
    store(userId: string, token: string): Promise<void>;
    get(userId: string): Promise<string | null>;
    remove(userId: string): Promise<void>;
    isValid(userId: string, token: string): Promise<boolean>;
}

