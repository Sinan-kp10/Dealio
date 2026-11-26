export type MessageSenderRole = "CUSTOMER" | "ENTERPRISE";

export type MessageType = "TEXT" | "IMAGE";

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
