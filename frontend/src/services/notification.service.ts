import axiosInstance from "../app/lib/axios";
import type {
  ApiResponse,
  GetNotificationsParams,
  PaginatedNotificationsResponse,
  UnreadCountResponse,
} from "../types/notification.types";

export const getUnreadCount = async (): Promise<number> => {
  const response = await axiosInstance.get<ApiResponse<UnreadCountResponse>>("/notifications/unread-count");
  return response.data.data.count;
};

export const getNotifications = async (params?: GetNotificationsParams): Promise<PaginatedNotificationsResponse> => {
  const response = await axiosInstance.get<ApiResponse<PaginatedNotificationsResponse>>("/notifications", {params});
  return response.data.data;
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await axiosInstance.patch(`/notifications/${notificationId}/read`);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await axiosInstance.patch("/notifications/read-all");
};
