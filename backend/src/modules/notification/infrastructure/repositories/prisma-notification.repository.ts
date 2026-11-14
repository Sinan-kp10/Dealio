import { prisma } from "../../../../infrastructure/database/prisma/prisma-client.js";
import { CreateNotificationDto, NotificationFiltersDto, NotificationDto, PaginatedNotificationsDto } from "../../application/dto/notification.dto.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";
import { notificationSelect, NotificationMapper } from "../mappers/notification.mapper.js";

export class PrismaNotificationRepository implements INotificationRepository {

    findById = async (id: string): Promise<NotificationDto | null> => {

        const notification = await prisma.notifications.findUnique({
            where: { id },
            select: notificationSelect,
        });

        return notification ? NotificationMapper.toDto(notification) : null;
    };

    createNotification = async (data: CreateNotificationDto): Promise<NotificationDto> => {

        const notification = await prisma.notifications.create({
            data: {
                user_id: data.userId,
                type: data.type,
                title: data.title,
                message: data.message,
            },
            select: notificationSelect,
        });

        return NotificationMapper.toDto(notification);
    };

    getNotifications = async (filters: NotificationFiltersDto): Promise<PaginatedNotificationsDto> => {

        const { userId, isRead, cursor, limit } = filters;

        const notifications = await prisma.notifications.findMany({
            where: {
                user_id: userId,
                ...(isRead !== undefined && { is_read: isRead }),
            },
            ...(cursor
                ? {
                    cursor: { id: cursor },
                    skip: 1,
                }
                : {}),
            take: limit + 1,
            orderBy: [
                { created_at: "desc" },
                { id: "desc" },
            ],
            select: notificationSelect,
        });

        const hasMore = notifications.length > limit;
        const items = notifications.slice(0, limit);

        return {
            items: items.map(NotificationMapper.toDto),
            nextCursor: hasMore ? items[items.length - 1].id : null,
            hasMore,
        };
    };

    getUnreadCount = async (userId: string): Promise<number> => {
        return await prisma.notifications.count({
            where: {
                user_id: userId,
                is_read: false,
            },
        });
    };

    markAsRead = async (notificationId: string, userId: string): Promise<void> => {

        await prisma.notifications.updateMany({
            where: {
                id: notificationId,
                user_id: userId,
                is_read: false,
            },
            data: {
                is_read: true,
                read_at: new Date(),
            },
        });
    };

    markAllAsRead = async (userId: string): Promise<void> => {

        await prisma.notifications.updateMany({
            where: {
                user_id: userId,
                is_read: false,
            },
            data: {
                is_read: true,
                read_at: new Date(),
            },
        });
    };
}
