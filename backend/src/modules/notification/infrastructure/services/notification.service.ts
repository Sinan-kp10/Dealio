import type { INotificationService, SendNotification } from "../../../../shared/interfaces/INotificationService.js";
import type { INotificationRepository } from "../../domain/repositories/notification.repository.js";

export class NotificationService implements INotificationService {
    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    send = async (data: SendNotification): Promise<void> => {

        await this.notificationRepository.createNotification(data);

    };
}