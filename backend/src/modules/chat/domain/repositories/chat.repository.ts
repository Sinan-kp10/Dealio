import { IBaseRepository } from "../../../../shared/domian/base.repository.js";
import type {ChatAccessDto,ChatFiltersDto,ChatListItemDto,PaginatedChatsDto} from "../../application/dto/chat.dto.js";
import type {SendMessageDataDto,MessageDto,PaginatedMessagesDto} from "../../application/dto/message.dto.js";

export interface IChatRepository extends IBaseRepository<ChatAccessDto | null> {
  findEnterpriseIdByUserId(userId: string): Promise<string | null>;
  findUserIdByEnterpriseId(enterpriseId: string): Promise<string | null>;
  getChats(filters: ChatFiltersDto): Promise<PaginatedChatsDto>;
  hasSharedQuotation(customerId: string, enterpriseId: string): Promise<boolean>;
  findChatByParticipants(customerId: string, enterpriseId: string, role: string): Promise<ChatListItemDto | null>;
  createChat(customerId: string, enterpriseId: string, role: string): Promise<ChatListItemDto>;
  getMessages(chatId: string, cursor?: string): Promise<PaginatedMessagesDto>;
  sendMessage(data: SendMessageDataDto): Promise<MessageDto>;
}
