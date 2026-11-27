import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { sendResponse } from "../../../../shared/presentation/api-response.js";
import type {ChatFiltersDto,ChatFilterTab,ChatListItemDto,PaginatedChatsDto,StartChatDto,} from "../../application/dto/chat.dto.js";
import type {GetMessagesDto,MessageDto,PaginatedMessagesDto,SendMessageDto,} from "../../application/dto/message.dto.js";

export class ChatController {
  constructor(
    private readonly getChatsUseCase: IUseCase<ChatFiltersDto, PaginatedChatsDto>,
    private readonly startChatUseCase: IUseCase<StartChatDto, ChatListItemDto>,
    private readonly getMessagesUseCase: IUseCase<GetMessagesDto, PaginatedMessagesDto>,
    private readonly sendMessageUseCase: IUseCase<SendMessageDto, MessageDto>
  ) {}

  getChats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.auth!;
      const { filter, search, cursor } = req.query;

      const result = await this.getChatsUseCase.execute({
        userId,
        role,
        filter: (filter as ChatFilterTab | undefined) ?? "all",
        search: search as string | undefined,
        cursor: cursor as string | undefined,
      });

      sendResponse(res, "Chats retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  };

  startChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.auth!;
      const { targetId } = req.body as { targetId: string };

      const result = await this.startChatUseCase.execute({
        userId,
        role,
        targetId,
      });

      sendResponse(res, "Chat retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  };

  getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.auth!;
      const chatId = req.params.chatId as string;
      const cursor = req.query.cursor as string | undefined;

      const result = await this.getMessagesUseCase.execute({
        chatId,
        userId,
        role,
        cursor,
      });

      sendResponse(res, "Messages retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.auth!;
      const chatId = req.params.chatId as string;
      const { content } = req.body as { content?: string };

      const result = await this.sendMessageUseCase.execute({
        chatId,
        userId,
        role,
        content,
        file: req.file,
      });

      sendResponse(res, "Message sent successfully", result, HttpStatusCode.CREATED);
    } catch (error) {
      next(error);
    }
  };
}
