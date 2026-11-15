import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware.js";
import { notificationController } from "../../infrastructure/container/notification.container.js";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware.js";
import { getNotificationsSchema } from "../validators/get-notifications.schema.js";
import { notificationIdSchema } from "../validators/notification-id.schema.js";

const router = Router();

router.use(authMiddleware);

router.get("/unread-count", notificationController.getUnreadCount);
router.get("/", validateRequest(getNotificationsSchema, "query"), notificationController.getNotifications);
router.patch("/read-all", notificationController.markAllNotificationsAsRead);
router.patch("/:notificationId/read", validateRequest(notificationIdSchema, "params"), notificationController.markNotificationAsRead);

export default router;