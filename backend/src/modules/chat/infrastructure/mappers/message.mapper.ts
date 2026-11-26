import { Prisma } from "../../../../../generated/prisma/client.js";
import type {
  MessageDto,
  MessageSenderRole,
  MessageType,
} from "../../application/dto/message.dto.js";

export const messageSelect = {
  id: true,
  chat_id: true,
  sender_id: true,
  sender_role: true,
  type: true,
  content: true,
  media_key: true,
  is_read: true,
  read_at: true,
  created_at: true,
} satisfies Prisma.messagesSelect;

export type MessageRecord = Prisma.messagesGetPayload<{select: typeof messageSelect}>;

export class MessageMapper {
  static toDto(record: MessageRecord): MessageDto {
    return {
      id: record.id,
      chatId: record.chat_id,
      senderId: record.sender_id,
      senderRole: record.sender_role as MessageSenderRole,
      type: record.type as MessageType,
      content: record.content,
      mediaUrl: record.media_key,
      isRead: record.is_read,
      readAt: record.read_at,
      createdAt: record.created_at,
    };
  }
}
