import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";

export class GetUnreadCountUseCase implements IUseCase<string, number> {
    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    execute = async (userId: string): Promise<number> => {
        return await this.notificationRepository.getUnreadCount(userId);
    };
}

