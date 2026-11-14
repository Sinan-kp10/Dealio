import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";

export interface MarkNotificationAsReadDto {
    notificationId: string;
    userId: string;
}

export class MarkNotificationAsReadUseCase implements IUseCase<MarkNotificationAsReadDto, void> {

    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    execute = async ({notificationId, userId}: MarkNotificationAsReadDto): Promise<void> => {

        await this.notificationRepository.markAsRead(notificationId,userId)
    };
}