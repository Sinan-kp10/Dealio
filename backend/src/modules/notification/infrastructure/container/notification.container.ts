import { PrismaNotificationRepository } from "../repositories/prisma-notification.repository.js";
import { GetNotificationsUseCase } from "../../application/use-cases/get-notifications.use-case.js";
import { GetUnreadCountUseCase } from "../../application/use-cases/get-unread-count.use-case.js";
import { MarkNotificationAsReadUseCase } from "../../application/use-cases/mark-notification-as-read.use-case.js";
import { MarkAllNotificationsAsReadUseCase } from "../../application/use-cases/mark-all-notifications-as-read.use-case.js";
import { NotificationService } from "../services/notification.service.js";
import { NotificationController } from "../../presentation/controllers/notification.controller.js";

const notificationRepository = new PrismaNotificationRepository();

// Notification service
export const notificationService = new NotificationService(notificationRepository);

// Notification use cases
const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);
const getUnreadCountUseCase = new GetUnreadCountUseCase(notificationRepository);
const markNotificationAsReadUseCase = new MarkNotificationAsReadUseCase(notificationRepository);
const markAllNotificationsAsReadUseCase = new MarkAllNotificationsAsReadUseCase(notificationRepository);

export const notificationController = new NotificationController(getNotificationsUseCase, getUnreadCountUseCase, markNotificationAsReadUseCase, markAllNotificationsAsReadUseCase)
