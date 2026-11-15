import app from "./app";
import { createServer } from "node:http";
import { env } from "../config/env";
import { ensureRedisConnected } from "../infrastructure/database/redis/redis-client";
import { initializeSocketServer } from "../infrastructure/socket/socket-server";
const httpServer = createServer(app);

const startServer = async () => {
  try {
    await ensureRedisConnected();
    initializeSocketServer(httpServer)

    httpServer.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer()