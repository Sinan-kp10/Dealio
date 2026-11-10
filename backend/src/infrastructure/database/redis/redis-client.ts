import { createClient } from "redis";
import { env } from "../../../config/env.js";

export const redis = createClient({
  url: env.redis.url,
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

let connectPromise: Promise<void> | null = null;

export const ensureRedisConnected = async (): Promise<void> => {
  if (redis.isOpen) return;
  if (!connectPromise) {
    connectPromise = redis
      .connect()
      .then(() => {})
      .catch((error) => {
        connectPromise = null;
        throw error;
      });
  }
  await connectPromise;
};
