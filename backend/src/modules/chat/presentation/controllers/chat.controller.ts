import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { sendResponse } from "../../../../shared/presentation/api-response.js";
import type {ChatFiltersDto,ChatFilterTab,PaginatedChatsDto,} from "../../application/dto/chat.dto.js";

export class ChatController {
  constructor(
    private readonly getChatsUseCase: IUseCase<ChatFiltersDto, PaginatedChatsDto>
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
}
