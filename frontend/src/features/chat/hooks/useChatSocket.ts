import { useEffect, useState } from "react";
import socket from "../../../services/socket.service";
import type { MessageItem } from "../types/message.types";

export interface ChatListUpdatePayload {
  chatId: string;
  lastMessageText: string;
  lastMessageAt: string;
  senderId: string;
}

interface UserStatusPayload {
  userId: string;
  isOnline: boolean;
}

interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface UseChatSocketParams {
  selectedId: string | null;
  participantUserId: string | null;
  onNewMessage: (message: MessageItem) => void;
  onChatListUpdate: (update: ChatListUpdatePayload) => void;
}

export const sendTextMessageViaSocket = (chatId: string, content: string): Promise<MessageItem> => {
  return new Promise((resolve, reject) => {

    socket.emit("chat:send_message",
      { chatId, content },
      (response: SocketResponse<MessageItem>) => {
        if (response.success && response.data) {
          resolve(response.data);
        } else {
          reject(new Error(response.error || "Failed to send message"));
        }
      }
    );
  });
};

export function useChatSocket({selectedId,participantUserId,onNewMessage,onChatListUpdate}: UseChatSocketParams): boolean {
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);

  useEffect(() => {
    socket.on("chat:new_message", onNewMessage);
    socket.on("chat:list_update", onChatListUpdate);

    return () => {
      socket.off("chat:new_message", onNewMessage);
      socket.off("chat:list_update", onChatListUpdate);
    };
  }, [onNewMessage, onChatListUpdate]);

  useEffect(() => {
    if (!selectedId) return;

    socket.emit("chat:join", selectedId);

    return () => {
      socket.emit("chat:leave", selectedId);
    };
  }, [selectedId]);

  useEffect(() => {
    if (!participantUserId) return;

    socket.emit(
      "chat:check_online",
      participantUserId,
      (res: UserStatusPayload) => {
        if (res.userId === participantUserId) {
          setIsRecipientOnline(res.isOnline);
        }
      }
    );

    const handleUserStatus = (status: UserStatusPayload) => {
      if (status.userId === participantUserId) {
        setIsRecipientOnline(status.isOnline);
      }
    };

    socket.on("user:status", handleUserStatus);
    return () => {
      socket.off("user:status", handleUserStatus);
    };
  }, [participantUserId]);

  return participantUserId ? isRecipientOnline : false;
}
