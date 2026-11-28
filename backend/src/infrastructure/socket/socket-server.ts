import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { AppError, UnauthorizedError, ForbiddenError, InternalServerError } from "../../shared/errors/app-error.js";
import { jwtTokenService } from "../../modules/auth/infrastructure/container/infrastructure.container.js";
import { prisma } from "../database/prisma/prisma-client.js";
import { env } from "../../config/env.js";
import { registerChatSocketHandlers } from "../../modules/chat/infrastructure/socket/chat.socket.js";
import {
    handleUserDisconnectVideoCall,
    registerVideoCallSocketHandlers,
} from "../../modules/chat/infrastructure/socket/video-call.socket.js";

let io: Server | null = null;
const onlineUsers = new Map<string, Set<string>>();

export const isUserOnline = (userId: string): boolean => {
    const sockets = onlineUsers.get(userId);
    return Boolean(sockets && sockets.size > 0);
};

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
                select: { 
                    status: true,
                    role : true,
                    enterprise_id : true
                },
            });

            if (!user) {
                throw new UnauthorizedError("Authentication required.", "UNAUTHENTICATED");
            }

            if (user.status === "SUSPENDED") {
                throw new ForbiddenError("Your account has been suspended.", "ACCOUNT_SUSPENDED");
            }

            socket.data.userId = payload.userId;
            socket.data.role = user.role;
            socket.data.enterpriseId = user.enterprise_id;
            
            next();
        } catch (error) {
            if (error instanceof AppError) {
                return next(error);
            }
            return next(new InternalServerError("Socket authentication failed.", "SOCKET_AUTHENTICATION_FAILED"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.data.userId as string;

        socket.join(`user:${userId}`);

        const existingSockets = onlineUsers.get(userId);
        const wasOffline = !existingSockets || existingSockets.size === 0;
        if (existingSockets) {
            existingSockets.add(socket.id);
        } else {
            onlineUsers.set(userId, new Set([socket.id]));
        }

        if (wasOffline) {
            io?.emit("user:status", { userId, isOnline: true });
        }

        registerChatSocketHandlers(socket);
        registerVideoCallSocketHandlers(socket);

        socket.on("disconnect", () => {
            const userSockets = onlineUsers.get(userId);
            if (!userSockets) return;

            userSockets.delete(socket.id);
            if (userSockets.size === 0) {
                onlineUsers.delete(userId);
                io?.emit("user:status", { userId, isOnline: false });
                handleUserDisconnectVideoCall(userId);
            }
        });
    });

    return io;
};

export const getSocketServer = (): Server => {
    if (!io) {
        throw new InternalServerError("Socket.IO server has not been initialized", "SOCKET_NOT_INITIALIZED");
    }
    return io;
};
