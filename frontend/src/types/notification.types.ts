export type NotificationType =
  | "KYC_VERIFIED"
  | "KYC_REJECTED"
  | "BANK_DETAILS_VERIFIED"
  | "BANK_DETAILS_REJECTED";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface GetNotificationsParams {
  isRead?: boolean;
  cursor?: string;
  limit?: number;
}

export interface PaginatedNotificationsResponse {
  items: NotificationItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface UnreadCountResponse {
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
