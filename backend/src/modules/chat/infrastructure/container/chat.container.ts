import { S3StorageService } from "../../../../infrastructure/storage/s3/s3-storage.service.js";
import { GetChatsUseCase } from "../../application/use-cases/get-chats.use-case.js";
import { GetMessagesUseCase } from "../../application/use-cases/get-messages.use-case.js";
import { MarkChatReadUseCase } from "../../application/use-cases/mark-chat-read.use-case.js";
import { SaveCallLogUseCase } from "../../application/use-cases/save-call-log.use-case.js";
import { SendMessageUseCase } from "../../application/use-cases/send-message.use-case.js";
import { StartChatUseCase } from "../../application/use-cases/start-chat.use-case.js";
import { ChatController } from "../../presentation/controllers/chat.controller.js";
import { LiveKitService } from "../livekit/livekit.service.js";
import { PrismaChatRepository } from "../repositories/prisma-chat.repository.js";

export const chatRepository = new PrismaChatRepository();
const storageService = new S3StorageService();
export const liveKitService = new LiveKitService();

const getChatsUseCase = new GetChatsUseCase(chatRepository, storageService);
const startChatUseCase = new StartChatUseCase(chatRepository, storageService);
const getMessagesUseCase = new GetMessagesUseCase(chatRepository, storageService);
export const sendMessageUseCase = new SendMessageUseCase(chatRepository, storageService);
export const markChatReadUseCase = new MarkChatReadUseCase(chatRepository);
export const saveCallLogUseCase = new SaveCallLogUseCase(chatRepository);

export const chatController = new ChatController(
  getChatsUseCase,
  startChatUseCase,
  getMessagesUseCase,
  sendMessageUseCase
);
