import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { ForbiddenError, NotFoundError } from "../../../../shared/errors/app-error.js";
import { getSocketServer } from "../../../../infrastructure/socket/socket-server.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";

export interface MarkChatReadDto {
  chatId: string;
  userId: string;
  role: string;
}

export class MarkChatReadUseCase implements IUseCase<MarkChatReadDto, void> {
  constructor(private readonly chatRepository: IChatRepository) {}

  execute = async ({ chatId, userId, role }: MarkChatReadDto): Promise<void> => {
    const chat = await this.chatRepository.findById(chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found.");
    }

    let readerRole: "CUSTOMER" | "ENTERPRISE" = "CUSTOMER";
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
      readerRole = "ENTERPRISE";
    }

    await this.chatRepository.markChatAsRead(chatId, readerRole);

    try {
      const io = getSocketServer();
      io.to(`chat:${chatId}`).emit("chat:messages_read", {
        chatId,
        readByRole: readerRole,
      });
    } catch {
      // Socket server may not be initialized in isolated unit tests
    }
  };
}
