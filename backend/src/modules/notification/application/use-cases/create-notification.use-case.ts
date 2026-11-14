import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";
import { CreateNotificationDto, NotificationDto,} from "../dto/notification.dto.js";

export class CreateNotificationUseCase implements IUseCase<CreateNotificationDto, NotificationDto> {

    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    execute = async (data: CreateNotificationDto): Promise<NotificationDto> => {

        return await this.notificationRepository.createNotification(data);
    };
}
