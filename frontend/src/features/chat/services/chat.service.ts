import axiosInstance from "../../../app/lib/axios";
import type { ApiResponse } from "../../../types/notification.types";
import type {
  ChatListItem,
  GetChatsParams,
  PaginatedChatsResponse,
} from "../types/chat.types";

export const getChats = async (params?: GetChatsParams): Promise<PaginatedChatsResponse> => {
  const response = await axiosInstance.get<ApiResponse<PaginatedChatsResponse>>("/chat", { params });
  return response.data.data;
};

export const startChat = async (targetId: string): Promise<ChatListItem> => {
  const response = await axiosInstance.post<ApiResponse<ChatListItem>>("/chat", { targetId });
  return response.data.data;
};
