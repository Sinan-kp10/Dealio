import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { ForbiddenError, NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IStorageService } from "../../../../shared/interfaces/IStorageService.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";
import type { ChatListItemDto, StartChatDto } from "../dto/chat.dto.js";

export class StartChatUseCase implements IUseCase<StartChatDto, ChatListItemDto> {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly storageService: IStorageService
  ) {}

  private resolveAvatarUrl = async (avatarUrl: string | null): Promise<string | null> => {
    if (!avatarUrl) {
      return null;
    }

    try {
      return avatarUrl.startsWith("http")
        ? avatarUrl
        : await this.storageService.getFileUrl(avatarUrl);
    } catch {
      return null;
    }
  };

  execute = async ({ userId, role, targetId }: StartChatDto): Promise<ChatListItemDto> => {
    let customerId = userId;
    let enterpriseId = targetId;

    if (role !== "CUSTOMER") {
      const resolvedEnterpriseId = await this.chatRepository.findEnterpriseIdByUserId(userId);
      if (!resolvedEnterpriseId) {
        throw new NotFoundError("Enterprise not found.");
      }
      customerId = targetId;
      enterpriseId = resolvedEnterpriseId;
    }

    const existingChat = await this.chatRepository.findChatByParticipants(customerId,enterpriseId,role);

    if (existingChat) {
      return {
        ...existingChat,
        avatarUrl: await this.resolveAvatarUrl(existingChat.avatarUrl),
      };
    }

    const hasSharedQuotation = await this.chatRepository.hasSharedQuotation(customerId,enterpriseId);

    if (!hasSharedQuotation) {
      throw new ForbiddenError("You can only start a chat when a shared quotation exists.");
    }

    const createdChat = await this.chatRepository.createChat(customerId, enterpriseId, role);

    return {
      ...createdChat,
      avatarUrl: await this.resolveAvatarUrl(createdChat.avatarUrl),
    };
  };
}
