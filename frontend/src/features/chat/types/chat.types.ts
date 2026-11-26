export type ChatFilterTab = "all" | "unread";

export interface GetChatsParams {
  filter?: ChatFilterTab;
  search?: string;
  cursor?: string;
}

export interface ChatListItem {
  id: string;
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

export interface ChatMessage {
  id: string;
  sender: "customer" | "enterprise";
  text: string;
  timestamp: string;
}
