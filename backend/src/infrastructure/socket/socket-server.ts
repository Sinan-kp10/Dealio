import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { AppError, UnauthorizedError, ForbiddenError, InternalServerError } from "../../shared/errors/app-error.js";
import { jwtTokenService } from "../../modules/auth/infrastructure/container/infrastructure.container.js";
import { prisma } from "../database/prisma/prisma-client.js";
import { env } from "../../config/env.js";

let io: Server | null = null;

export const initializeSocketServer = (httpServer: HttpServer): Server => {
    io = new Server(httpServer, {
        cors: {
            origin: env.clientUrl,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.use(async (socket, next) => {
        try {
            const cookie = socket.handshake.headers.cookie;
            const token = cookie?.match(/accessToken=([^;]+)/)?.[1];

            if (!token) {
                throw new UnauthorizedError("Authentication required.", "UNAUTHENTICATED");
            }

            const payload = jwtTokenService.verifyAccessToken(decodeURIComponent(token));

            const user = await prisma.users.findUnique({
                where: { id: payload.userId },
                select: { status: true },
            });

            if (!user) {
                throw new UnauthorizedError("Authentication required.", "UNAUTHENTICATED");
            }

            if (user.status === "SUSPENDED") {
                throw new ForbiddenError("Your account has been suspended.", "ACCOUNT_SUSPENDED");
            }

            socket.data.userId = payload.userId;
            next();
        } catch (error) {
            if (error instanceof AppError) {
                return next(error);
            }
            return next(new InternalServerError("Socket authentication failed.", "SOCKET_AUTHENTICATION_FAILED"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.data.userId;

        socket.join(`user:${userId}`);
    });

    return io;
};

export const getSocketServer = (): Server => {
    if (!io) {
        throw new InternalServerError("Socket.IO server has not been initialized", "SOCKET_NOT_INITIALIZED");
    }
    return io;
};
