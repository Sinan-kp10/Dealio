import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../../../shared/presentation/api-response.js";
import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { NotificationFiltersDto, PaginatedNotificationsDto } from "../../application/dto/notification.dto.js";
import { MarkNotificationAsReadDto } from "../../application/use-cases/mark-notification-as-read.use-case.js";

export class NotificationController {
    constructor(
        private readonly getNotificationsUseCase: IUseCase<NotificationFiltersDto, PaginatedNotificationsDto>,
        private readonly getUnreadCountUseCase: IUseCase<string, number>,
        private readonly markNotificationAsReadUseCase: IUseCase<MarkNotificationAsReadDto, void>,
        private readonly markAllNotificationsAsReadUseCase: IUseCase<string, void>
    ) {}

    getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const isRead = req.query.isRead !== undefined ? req.query.isRead === "true" : undefined;

            const result = await this.getNotificationsUseCase.execute({
                userId : userId!,
                isRead,
                cursor: req.query.cursor as string | undefined,
                limit: Number(req.query.limit ?? 5),
            });

            sendResponse(res, "Notifications retrieved successfully", result);
        } catch (error) {
            next(error);
        }
    };

    getUnreadCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId
            const count = await this.getUnreadCountUseCase.execute(userId!);

            sendResponse(res, "Unread notifications count retrieved successfully", { count });
        } catch (error) {
            next(error);
        }
    };

    markNotificationAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const notificationId = req.params.notificationId as string;

            await this.markNotificationAsReadUseCase.execute({ notificationId, userId : userId! });

            sendResponse(res, "Notification marked as read successfully");
        } catch (error) {
            next(error);
        }
    };

    markAllNotificationsAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            await this.markAllNotificationsAsReadUseCase.execute(userId!);

            sendResponse(res, "All notifications marked as read successfully");
        } catch (error) {
            next(error);
        }
    };
}
