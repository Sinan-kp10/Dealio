import { IBaseRepository } from "../../../../shared/domian/base.repository.js";
import type {CreateNotificationDto,NotificationDto,NotificationFiltersDto,PaginatedNotificationsDto,} from "../../application/dto/notification.dto.js";

export interface INotificationRepository extends IBaseRepository<NotificationDto> {

    createNotification(data: CreateNotificationDto): Promise<NotificationDto>;
    getNotifications(filters: NotificationFiltersDto): Promise<PaginatedNotificationsDto>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(notificationId: string, userId: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
}
