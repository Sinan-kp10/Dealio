import type { Socket } from "socket.io";
import { z } from "zod";
import { isUserOnline } from "../../../../infrastructure/socket/socket-server.js";
import type { MessageDto } from "../../application/dto/message.dto.js";
import { sendMessageSchema } from "../../presentation/validators/send-message.schema.js";
import { chatRepository, sendMessageUseCase } from "../container/chat.container.js";

const chatIdSchema = z.string().uuid("Invalid chat ID.");

interface SocketSendMessagePayload {
  chatId: string;
  content?: string;
}

interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

const hasChatAccess = async (chatId: string,userId: string,role: string): Promise<boolean> => {
  const chat = await chatRepository.findById(chatId);
  if (!chat) return false;

  if (role === "CUSTOMER") {
    return chat.customerId === userId;
  }

  const enterpriseId = await chatRepository.findEnterpriseIdByUserId(userId);
  return Boolean(enterpriseId && chat.enterpriseId === enterpriseId);
};

export const registerChatSocketHandlers = (socket: Socket): void => {
  const userId = socket.data.userId as string;
  const role = socket.data.role as string;

  socket.on("chat:join", async (chatId: unknown, callback?: (res: SocketResponse) => void) => {
    const parsedId = chatIdSchema.safeParse(chatId);
    if (!parsedId.success) {
      callback?.({ success: false, error: "Invalid chat ID." });
      return;
    }

    try {
      const allowed = await hasChatAccess(parsedId.data, userId, role);
      if (!allowed) {
        callback?.({ success: false, error: "Access denied to this chat." });
        return;
      }

      await socket.join(`chat:${parsedId.data}`);
      callback?.({ success: true });
    } catch {
      callback?.({ success: false, error: "Failed to join chat." });
    }
  });

  socket.on("chat:leave", async (chatId: unknown) => {
    const parsedId = chatIdSchema.safeParse(chatId);
    if (!parsedId.success) return;
    await socket.leave(`chat:${parsedId.data}`);
  });

  socket.on(
    "chat:send_message",
    async (
      payload: SocketSendMessagePayload,
      callback?: (res: SocketResponse<MessageDto>) => void
    ) => {
      const parsedId = chatIdSchema.safeParse(payload?.chatId);
      const parsedBody = sendMessageSchema.safeParse({ content: payload?.content });

      if (!parsedId.success || !parsedBody.success || !parsedBody.data.content) {
        callback?.({ success: false, error: "Invalid message payload." });
        return;
      }

      try {
        const message = await sendMessageUseCase.execute({
          chatId: parsedId.data,
          userId,
          role,
          content: parsedBody.data.content,
        });

        callback?.({ success: true, data: message });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to send message.";
        callback?.({ success: false, error: message });
      }
    }
  );

  socket.on(
    "chat:check_online",
    (targetUserId: unknown, callback?: (res: { userId: string; isOnline: boolean }) => void) => {
      if (typeof targetUserId !== "string" || !targetUserId) {
        callback?.({ userId: "", isOnline: false });
        return;
      }
      callback?.({ userId: targetUserId, isOnline: isUserOnline(targetUserId) });
    }
  );
};
