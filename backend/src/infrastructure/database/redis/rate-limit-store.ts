import { RedisStore } from "rate-limit-redis";
import { redis, ensureRedisConnected } from "./redis-client.js";

export const createRedisRateLimitStore = (prefix: string) => {
    return new RedisStore({
        sendCommand: async (...args: string[]) => {
            await ensureRedisConnected();
            return redis.sendCommand(args);
        },
        prefix,
    });
};