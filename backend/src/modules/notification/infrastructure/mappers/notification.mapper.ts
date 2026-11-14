import { Prisma } from "../../../../../generated/prisma/client";
import type { NotificationDto } from "../../application/dto/notification.dto";

export const notificationSelect = {
    id: true,
    type: true,
    title: true,
    message: true,
    is_read: true,
    created_at: true,
} satisfies Prisma.notificationsSelect;

export type NotificationRecord = Prisma.notificationsGetPayload<{select: typeof notificationSelect}>

export class NotificationMapper {
    static toDto(notification: NotificationRecord): NotificationDto {
        return {
            id: notification.id,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            isRead: notification.is_read,
            createdAt: notification.created_at,
        };
    }
}
