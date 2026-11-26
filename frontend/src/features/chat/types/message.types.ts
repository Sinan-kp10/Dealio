export type MessageSenderRole = "CUSTOMER" | "ENTERPRISE";

export type MessageType = "TEXT" | "IMAGE";

export interface GetMessagesParams {
  cursor?: string;
}

export interface MessageItem {
  id: string;
  chatId: string;
  senderId: string;
  senderRole: MessageSenderRole;
  type: MessageType;
  content: string | null;
  mediaUrl: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface PaginatedMessagesResponse {
  items: MessageItem[];
  nextCursor: string | null;
  hasMore: boolean;
}
