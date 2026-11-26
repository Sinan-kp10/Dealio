import type {
  ChatFiltersDto,
  ChatListItemDto,
  PaginatedChatsDto,
} from "../../application/dto/chat.dto.js";

export interface IChatRepository {
  findEnterpriseIdByUserId(userId: string): Promise<string | null>;
  getChats(filters: ChatFiltersDto): Promise<PaginatedChatsDto>;
  hasSharedQuotation(customerId: string, enterpriseId: string): Promise<boolean>;
  findChatByParticipants(customerId: string,enterpriseId: string,role: string): Promise<ChatListItemDto | null>;
  createChat(customerId: string,enterpriseId: string,role: string): Promise<ChatListItemDto>;
}
