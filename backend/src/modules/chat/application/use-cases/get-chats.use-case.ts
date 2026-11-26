import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IStorageService } from "../../../../shared/interfaces/IStorageService.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";
import type { ChatFiltersDto, PaginatedChatsDto } from "../dto/chat.dto.js";

export class GetChatsUseCase implements IUseCase<ChatFiltersDto, PaginatedChatsDto> {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly storageService: IStorageService
  ) {}

  execute = async (filters: ChatFiltersDto): Promise<PaginatedChatsDto> => {
    const { role, userId, filter, search, cursor } = filters;

    let targetId = userId;
    
    if (role !== "CUSTOMER") {

      const enterpriseId = await this.chatRepository.findEnterpriseIdByUserId(userId);

      if (!enterpriseId) {
        throw new NotFoundError("Enterprise not found.");
      }

      targetId = enterpriseId;
    }

    const result = await this.chatRepository.getChats({
      role,
      userId: targetId,
      filter,
      search,
      cursor,
    });

    const items = await Promise.all(
      result.items.map(async (item) => {
        if (!item.avatarUrl) {
          return item;
        }

        try {
          const resolvedUrl = item.avatarUrl.startsWith("http")
            ? item.avatarUrl
            : await this.storageService.getFileUrl(item.avatarUrl);

          return {
            ...item,
            avatarUrl: resolvedUrl,
          };
        } catch {
          return {
            ...item,
            avatarUrl: null,
          };
        }
      })
    );

    return {
      ...result,
      items,
    };
  };
}
