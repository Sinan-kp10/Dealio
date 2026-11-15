import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";
import { MarkNotificationAsReadDto } from "../dto/notification.dto.js";

export class MarkNotificationAsReadUseCase implements IUseCase<MarkNotificationAsReadDto, void> {

    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    execute = async ({notificationId, userId}: MarkNotificationAsReadDto): Promise<void> => {

        await this.notificationRepository.markAsRead(notificationId,userId)
    };
}