export type MessageSenderRole = "CUSTOMER" | "ENTERPRISE";

export type MessageType = "TEXT" | "IMAGE" | "CALL";

export type CallLogStatus = "COMPLETED" | "MISSED" | "DECLINED";

export interface SaveCallLogDto {
  chatId: string;
  callerId: string;
  callerRole: string;
  status: CallLogStatus;
  durationSeconds?: number;
}

export interface GetMessagesDto {
  chatId: string;
  userId: string;
  role: string;
  cursor?: string;
}

export interface MessageDto {
  id: string;
  chatId: string;
  senderId: string;
  senderRole: MessageSenderRole;
  type: MessageType;
  content: string | null;
  mediaUrl: string | null;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}

export interface PaginatedMessagesDto {
  items: MessageDto[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface SendMessageDto {
  chatId: string;
  userId: string;
  role: string;
  content?: string;
  file?: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  };
}

export interface SendMessageDataDto {
  chatId: string;
  senderId: string;
  senderRole: MessageSenderRole;
  type: MessageType;
  content: string | null;
  mediaKey: string | null;
  lastMessagePreview: string;
}
