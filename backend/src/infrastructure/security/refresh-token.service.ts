import { redis } from "../database/redis/redis-client.js";
import { env } from "../../config/env.js";

export class RefreshTokenService {

    private readonly TTL_SECONDS = env.auth.refreshTokenTtlSeconds;

    private getKey(userId: string): string {
        return `refresh_token:${userId}`;
    }

    store = async (userId: string, token: string): Promise<void> => {
        await redis.set(this.getKey(userId), token, {
            EX: this.TTL_SECONDS,
        });
    };

    get = async (userId: string): Promise<string | null> => {
        return await redis.get(this.getKey(userId));
    };

    remove = async (userId: string): Promise<void> => {
        await redis.del(this.getKey(userId));
    };

    isValid = async (userId: string, token: string): Promise<boolean> => {
        const storedToken = await this.get(userId);
        return storedToken !== null && storedToken === token;
    };
}
