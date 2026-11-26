import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware.js";
import { requireRole } from "../../../../app/middlewares/role.middleware.js";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware.js";
import { chatController } from "../../infrastructure/container/chat.container.js";
import { chatIdSchema } from "../validators/chat-id.schema.js";
import { getChatsSchema } from "../validators/get-chats.schema.js";
import { getMessagesSchema } from "../validators/get-messages.schema.js";
import { startChatSchema } from "../validators/start-chat.schema.js";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("CUSTOMER", "ENTERPRISE_MANAGER"));

router.get("/", validateRequest(getChatsSchema, "query"), chatController.getChats);
router.post("/", validateRequest(startChatSchema, "body"), chatController.startChat);
router.get("/:chatId/messages", validateRequest(chatIdSchema, "params"), validateRequest(getMessagesSchema, "query"), chatController.getMessages);

export default router;
