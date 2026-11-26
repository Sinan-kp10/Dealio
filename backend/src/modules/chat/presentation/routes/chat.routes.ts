import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware.js";
import { requireRole } from "../../../../app/middlewares/role.middleware.js";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware.js";
import { chatController } from "../../infrastructure/container/chat.container.js";
import { getChatsSchema } from "../validators/get-chats.schema.js";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("CUSTOMER", "ENTERPRISE_MANAGER"));

router.get("/", validateRequest(getChatsSchema, "query"), chatController.getChats);

export default router;
