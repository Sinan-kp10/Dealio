import { createClient } from "redis";
import { env } from "../../../config/env.js";

export const redis = createClient({
  url: env.redis.url,
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});
