import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { NotFoundError } from "../../../../shared/errors/app-error.js";
import { getSocketServer } from "../../../../infrastructure/socket/socket-server.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";
import type { MessageDto, MessageSenderRole, SaveCallLogDto } from "../dto/message.dto.js";
import { formatCallContent } from "../utils/call-log.utils.js";

export class SaveCallLogUseCase implements IUseCase<SaveCallLogDto, MessageDto> {
  constructor(private readonly chatRepository: IChatRepository) {}

  execute = async ({chatId,callerId,callerRole,status,durationSeconds,}: SaveCallLogDto): Promise<MessageDto> => {
    const chat = await this.chatRepository.findById(chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found.");
    }

    const senderRole: MessageSenderRole = callerRole === "CUSTOMER" ? "CUSTOMER" : "ENTERPRISE";
    const content = formatCallContent(status, durationSeconds);

    const message = await this.chatRepository.sendMessage({
      chatId,
      senderId: callerId,
      senderRole,
      type: "CALL",
      content,
      mediaKey: null,
      lastMessagePreview: content,
    });

    const recipientUserId =
      senderRole === "CUSTOMER"
        ? await this.chatRepository.findUserIdByEnterpriseId(chat.enterpriseId)
        : chat.customerId;

    this.emitCallLogToSocket(chatId, message, content, recipientUserId);

    return message;
  };

  private emitCallLogToSocket = (chatId: string,message: MessageDto,lastMessagePreview: string,recipientUserId: string | null): void => {
    try {
      const io = getSocketServer();
      io.to(`chat:${chatId}`).emit("chat:new_message", message);

      if (recipientUserId) {
        io.to(`user:${recipientUserId}`).emit("chat:list_update", {
          chatId,
          lastMessageText: lastMessagePreview,
          lastMessageAt: message.createdAt,
          senderId: message.senderId,
        });
      }
    } catch(error) {
      console.error("Failed to emit call log:", error)
    }
  };
}
