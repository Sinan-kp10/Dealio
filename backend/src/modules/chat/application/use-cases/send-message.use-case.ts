import { randomUUID } from "crypto";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import {BadRequestError,ForbiddenError,NotFoundError,} from "../../../../shared/errors/app-error.js";
import type { IStorageService } from "../../../../shared/interfaces/IStorageService.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";
import type {MessageDto,MessageSenderRole,SendMessageDto,} from "../dto/message.dto.js";

export class SendMessageUseCase implements IUseCase<SendMessageDto, MessageDto> {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly storageService: IStorageService
  ) {}

  execute = async ({chatId,userId,role,content,file}: SendMessageDto): Promise<MessageDto> => {
    const messageContent = content || null;

    if (!messageContent && !file) {
      throw new BadRequestError("Message text or image is required.");
    }

    const chat = await this.chatRepository.findById(chatId);
    if (!chat) {
      throw new NotFoundError("Chat not found.");
    }

    let senderRole: MessageSenderRole = "CUSTOMER";
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
      senderRole = "ENTERPRISE";
    }

    let mediaKey: string | null = null;
    if (file) {
      const ext = file.mimetype.split("/")[1] || "jpg";
      mediaKey = `chat-media/${chatId}/${randomUUID()}.${ext}`;
      await this.storageService.uploadFile({
        key: mediaKey,
        buffer: file.buffer,
        contentType: file.mimetype,
      });
    }

    const type = file ? "IMAGE" : "TEXT";
    const lastMessagePreview = messageContent? messageContent.slice(0, 500) : "Photo";

    const message = await this.chatRepository.sendMessage({
      chatId,
      senderId: userId,
      senderRole,
      type,
      content: messageContent,
      mediaKey,
      lastMessagePreview,
    });

    if (!message.mediaUrl) {
      return message;
    }

    const signedUrl = await this.storageService.getFileUrl(message.mediaUrl);
    return {
      ...message,
      mediaUrl: signedUrl,
    };
  };
}
