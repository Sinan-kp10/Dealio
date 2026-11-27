import axiosInstance from "../../../app/lib/axios";
import type { ApiResponse } from "../../../types/notification.types";
import type {ChatListItem,GetChatsParams,PaginatedChatsResponse,} from "../types/chat.types";
import type {GetMessagesParams,MessageItem,PaginatedMessagesResponse,SendMessagePayload} from "../types/message.types";

export const getChats = async (params?: GetChatsParams): Promise<PaginatedChatsResponse> => {
  const response = await axiosInstance.get<ApiResponse<PaginatedChatsResponse>>("/chat", { params });
  return response.data.data;
};

export const startChat = async (targetId: string): Promise<ChatListItem> => {
  const response = await axiosInstance.post<ApiResponse<ChatListItem>>("/chat", { targetId });
  return response.data.data;
};

export const getMessages = async (chatId: string,params?: GetMessagesParams): Promise<PaginatedMessagesResponse> => {
  const response = await axiosInstance.get<ApiResponse<PaginatedMessagesResponse>>(`/chat/${chatId}/messages`, { params });
  return response.data.data;
};

export const sendMessage = async (chatId: string, payload: SendMessagePayload): Promise<MessageItem> => {
  const content = payload.content?.trim();

  if (payload.image) {
    const formData = new FormData();
    formData.append("image", payload.image);
    if (content) {
      formData.append("content", content);
    }
    const response = await axiosInstance.post<ApiResponse<MessageItem>>(`/chat/${chatId}/messages`,formData,{ headers: { "Content-Type": "multipart/form-data" } },);
    return response.data.data;
  }

  const response = await axiosInstance.post<ApiResponse<MessageItem>>(`/chat/${chatId}/messages`,{ content },);
  return response.data.data;
};
