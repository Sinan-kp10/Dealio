export type ChatFilterTab = "all" | "unread";

export interface ChatFiltersDto {
  userId: string;
  role: string;
  filter: ChatFilterTab;
  search?: string;
  cursor?: string;
}

export interface StartChatDto {
  userId: string;
  role: string;
  targetId: string;
}

export interface ChatListItemDto {
  id: string;
  name: string;
  avatarUrl: string | null;
  lastMessageText: string | null;
  lastMessageAt: Date | null;
  unreadCount: number;
}

export interface PaginatedChatsDto {
  items: ChatListItemDto[];
  nextCursor: string | null;
  hasMore: boolean;
  totalUnreadChats: number;
}

export interface ChatAccessDto {
  id: string;
  customerId: string;
  enterpriseId: string;
}
