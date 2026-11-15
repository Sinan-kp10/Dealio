import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";

export class MarkAllNotificationsAsReadUseCase implements IUseCase<string, void> {

    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    execute = async (userId: string): Promise<void> => {

        await this.notificationRepository.markAllAsRead(userId)
    }
}