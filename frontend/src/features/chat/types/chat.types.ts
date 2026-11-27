export type ChatFilterTab = "all" | "unread";

export interface GetChatsParams {
  filter?: ChatFilterTab;
  search?: string;
  cursor?: string;
}

export interface ChatListItem {
  id: string;
  participantUserId: string | null;
  name: string;
  avatarUrl: string | null;
  lastMessageText: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface PaginatedChatsResponse {
  items: ChatListItem[];
  nextCursor: string | null;
  hasMore: boolean;
  totalUnreadChats: number;
}
