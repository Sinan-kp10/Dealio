import app from "./app";
import { env } from "./config/env.js";
import { redis } from "./infrastructure/database/redis-client";

const startServer = async () => {
  try {
    await redis.connect();

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();