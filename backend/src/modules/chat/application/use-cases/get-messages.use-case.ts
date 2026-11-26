import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { ForbiddenError, NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IStorageService } from "../../../../shared/interfaces/IStorageService.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";
import type { GetMessagesDto, PaginatedMessagesDto } from "../dto/message.dto.js";

export class GetMessagesUseCase implements IUseCase<GetMessagesDto, PaginatedMessagesDto> {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly storageService: IStorageService
  ) {}

  execute = async ({chatId,userId,role,cursor,}: GetMessagesDto): Promise<PaginatedMessagesDto> => {
    const chat = await this.chatRepository.findById(chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found.");
    }

    if (role === "CUSTOMER") {
      if (chat.customerId !== userId) {
        throw new ForbiddenError("You do not have access to this chat.");
      }
    } else {
      const enterpriseId = await this.chatRepository.findEnterpriseIdByUserId(userId);
      if (!enterpriseId) {
        throw new NotFoundError("Enterprise not found.");
      }
      if (chat.enterpriseId !== enterpriseId) {
        throw new ForbiddenError("You do not have access to this chat.");
      }
    }

    const result = await this.chatRepository.getMessages(chatId, cursor);

    const items = await Promise.all(
      result.items.map(async (message) => {
        if (!message.mediaUrl) {
          return message;
        }

        try {
          const resolvedUrl = message.mediaUrl.startsWith("http")? message.mediaUrl : await this.storageService.getFileUrl(message.mediaUrl);
          return {
            ...message,
            mediaUrl: resolvedUrl,
          };
        } catch {
          return {
            ...message,
            mediaUrl: null,
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
