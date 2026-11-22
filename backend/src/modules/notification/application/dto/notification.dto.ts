import type { NotificationType } from "../../../../shared/interfaces/INotificationService.js";

export interface CreateNotificationDto {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
}

export interface NotificationDto {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

export interface NotificationFiltersDto {
    userId: string;
    isRead?: boolean;
    cursor?: string;
    limit: number;
}

export interface PaginatedNotificationsDto {
    items: NotificationDto[];
    nextCursor: string | null;
    hasMore: boolean;
}

export interface UnreadNotificationCountDto {
    count: number;
}

export interface MarkNotificationAsReadDto {
    notificationId: string;
    userId: string;
}