import { S3StorageService } from "../../../../infrastructure/storage/s3/s3-storage.service.js";
import { GetChatsUseCase } from "../../application/use-cases/get-chats.use-case.js";
import { ChatController } from "../../presentation/controllers/chat.controller.js";
import { PrismaChatRepository } from "../repositories/prisma-chat.repository.js";

const chatRepository = new PrismaChatRepository();
const storageService = new S3StorageService();

const getChatsUseCase = new GetChatsUseCase(chatRepository, storageService);

export const chatController = new ChatController(getChatsUseCase);
