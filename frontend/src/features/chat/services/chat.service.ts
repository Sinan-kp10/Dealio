import axiosInstance from "../../../app/lib/axios";
import type { ApiResponse } from "../../../types/notification.types";
import type { GetChatsParams, PaginatedChatsResponse } from "../types/chat.types";

export const getChats = async (params?: GetChatsParams): Promise<PaginatedChatsResponse> => {
  const response = await axiosInstance.get<ApiResponse<PaginatedChatsResponse>>("/chat", { params });
  return response.data.data;
};
