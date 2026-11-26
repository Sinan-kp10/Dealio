import type {ChatFiltersDto,PaginatedChatsDto,} from "../../application/dto/chat.dto.js";

export interface IChatRepository {
  findEnterpriseIdByUserId(userId: string): Promise<string | null>;
  getChats(filters: ChatFiltersDto): Promise<PaginatedChatsDto>;
}
