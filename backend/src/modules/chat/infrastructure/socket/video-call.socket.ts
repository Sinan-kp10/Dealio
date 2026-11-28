import type { Socket } from "socket.io";
import { getSocketServer } from "../../../../infrastructure/socket/socket-server.js";
import { chatRepository, liveKitService, saveCallLogUseCase } from "../container/chat.container.js";
import { chatIdSchema, type SocketResponse } from "./chat.socket.js";

const CALL_RING_TIMEOUT_MS = 30_000;

interface CallInitiatePayload {
  chatId: string;
  callerName: string;
  callerAvatarUrl?: string | null;
}

interface CallAcceptPayload {
  chatId: string;
  calleeName: string;
}

interface CallTokenResponse {
  roomName: string;
  token: string;
  serverUrl: string;
}

interface ActiveCall {
  chatId: string;
  roomName: string;
  callerId: string;
  callerRole: string;
  calleeId: string;
  startedAt: number | null;
  timeout: NodeJS.Timeout;
}

const activeCalls = new Map<string, ActiveCall>();

const clearActiveCall = (chatId: string): ActiveCall | null => {
  const activeCall = activeCalls.get(chatId);
  if (!activeCall) return null;

  clearTimeout(activeCall.timeout);
  activeCalls.delete(chatId);
  return activeCall;
};

const finishActiveCall = (activeCall: ActiveCall): void => {
  clearActiveCall(activeCall.chatId);
  const durationSeconds = activeCall.startedAt? Math.round((Date.now() - activeCall.startedAt) / 1000) : 0;

  const io = getSocketServer();
  io.to(`user:${activeCall.callerId}`).emit("call:ended", { chatId: activeCall.chatId });
  io.to(`user:${activeCall.calleeId}`).emit("call:ended", { chatId: activeCall.chatId });

  void saveCallLogUseCase.execute({
    chatId: activeCall.chatId,
    callerId: activeCall.callerId,
    callerRole: activeCall.callerRole,
    status: activeCall.startedAt ? "COMPLETED" : "MISSED",
    durationSeconds,
  });
};

export const handleUserDisconnectVideoCall = (userId: string): void => {
  for (const activeCall of activeCalls.values()) {
    if (activeCall.callerId === userId || activeCall.calleeId === userId) {
      finishActiveCall(activeCall);
    }
  }
};

export const registerVideoCallSocketHandlers = (socket: Socket): void => {
  const userId = socket.data.userId as string;
  const role = socket.data.role as string;
  const enterpriseId = (socket.data.enterpriseId as string | null) ?? null;

  socket.on(
    "call:initiate",
    async (
      payload: CallInitiatePayload,
      callback?: (res: SocketResponse<CallTokenResponse>) => void
    ) => {
      const parsedId = chatIdSchema.safeParse(payload?.chatId);
      if (!parsedId.success) {
        callback?.({ success: false, error: "Invalid chat ID." });
        return;
      }

      const chatId = parsedId.data;
      if (activeCalls.has(chatId)) {
        callback?.({ success: false, error: "A call is already in progress." });
        return;
      }

      try {
        const chat = await chatRepository.findById(chatId);
        if (!chat) {
          callback?.({ success: false, error: "Chat not found." });
          return;
        }

        const isCustomer = role === "CUSTOMER";
        const isAuthorized = isCustomer? chat.customerId === userId : enterpriseId === chat.enterpriseId;

        if (!isAuthorized) {
          callback?.({ success: false, error: "Access denied to this chat." });
          return;
        }

        const calleeId = isCustomer
          ? await chatRepository.findUserIdByEnterpriseId(chat.enterpriseId)
          : chat.customerId;

        if (!calleeId) {
          callback?.({ success: false, error: "Recipient not found." });
          return;
        }

        const roomName = `call-${chatId}`;
        const tokenResult = await liveKitService.generateRoomToken({
          roomName,
          participantIdentity: userId,
          participantName: payload.callerName || "User",
        });

        const io = getSocketServer();
        const timeout = setTimeout(() => {
          const missedCall = clearActiveCall(chatId);
          if (!missedCall) return;

          io.to(`user:${missedCall.callerId}`).emit("call:missed", { chatId });
          io.to(`user:${missedCall.calleeId}`).emit("call:missed", { chatId });
          void saveCallLogUseCase.execute({
            chatId,
            callerId: missedCall.callerId,
            callerRole: missedCall.callerRole,
            status: "MISSED",
          });
        }, CALL_RING_TIMEOUT_MS);

        activeCalls.set(chatId, {
          chatId,
          roomName,
          callerId: userId,
          callerRole: role,
          calleeId,
          startedAt: null,
          timeout,
        });

        io.to(`user:${calleeId}`).emit("call:incoming", {
          chatId,
          callerId: userId,
          callerName: payload.callerName || "User",
          callerAvatarUrl: payload.callerAvatarUrl ?? null,
        });

        callback?.({
          success: true,
          data: { roomName, token: tokenResult.token, serverUrl: tokenResult.serverUrl },
        });
      } catch {
        callback?.({ success: false, error: "Failed to start video call." });
      }
    }
  );

  socket.on(
    "call:accept",
    async (
      payload: CallAcceptPayload,
      callback?: (res: SocketResponse<CallTokenResponse>) => void
    ) => {
      const parsedId = chatIdSchema.safeParse(payload?.chatId);
      if (!parsedId.success) {
        callback?.({ success: false, error: "Invalid chat ID." });
        return;
      }

      const activeCall = activeCalls.get(parsedId.data);
      if (!activeCall || activeCall.calleeId !== userId) {
        callback?.({ success: false, error: "Call is no longer active." });
        return;
      }

      clearTimeout(activeCall.timeout);
      activeCall.startedAt = Date.now();

      try {
        const tokenResult = await liveKitService.generateRoomToken({
          roomName: activeCall.roomName,
          participantIdentity: userId,
          participantName: payload.calleeName || "User",
        });

        getSocketServer().to(`user:${activeCall.callerId}`).emit("call:accepted", {
          chatId: activeCall.chatId,
        });

        callback?.({
          success: true,
          data: {
            roomName: activeCall.roomName,
            token: tokenResult.token,
            serverUrl: tokenResult.serverUrl,
          },
        });
      } catch {
        clearActiveCall(activeCall.chatId);
        callback?.({ success: false, error: "Failed to join video call." });
      }
    }
  );

  socket.on("call:decline", (chatId: unknown) => {
    const parsedId = chatIdSchema.safeParse(chatId);
    if (!parsedId.success) return;

    const existing = activeCalls.get(parsedId.data);
    if (!existing || existing.calleeId !== userId) return;

    clearActiveCall(parsedId.data);
    getSocketServer().to(`user:${existing.callerId}`).emit("call:declined", {
      chatId: existing.chatId,
    });

    void saveCallLogUseCase.execute({
      chatId: existing.chatId,
      callerId: existing.callerId,
      callerRole: existing.callerRole,
      status: "DECLINED",
    });
  });

  socket.on("call:cancel", (chatId: unknown) => {
    const parsedId = chatIdSchema.safeParse(chatId);
    if (!parsedId.success) return;

    const existing = activeCalls.get(parsedId.data);
    if (!existing || existing.callerId !== userId || existing.startedAt !== null) return;

    clearActiveCall(parsedId.data);
    getSocketServer().to(`user:${existing.calleeId}`).emit("call:cancelled", {
      chatId: existing.chatId,
    });

    void saveCallLogUseCase.execute({
      chatId: existing.chatId,
      callerId: existing.callerId,
      callerRole: existing.callerRole,
      status: "MISSED",
    });
  });

  socket.on("call:end", (chatId: unknown) => {
    const parsedId = chatIdSchema.safeParse(chatId);
    if (!parsedId.success) return;

    const existing = activeCalls.get(parsedId.data);
    if (!existing || (existing.callerId !== userId && existing.calleeId !== userId)) return;

    finishActiveCall(existing);
  });
};
