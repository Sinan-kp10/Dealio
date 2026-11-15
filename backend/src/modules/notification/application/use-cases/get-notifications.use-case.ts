import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { INotificationRepository } from "../../domain/repositories/notification.repository.js";
import { NotificationFiltersDto, PaginatedNotificationsDto,} from "../dto/notification.dto.js";

export class GetNotificationsUseCase implements IUseCase<NotificationFiltersDto, PaginatedNotificationsDto> {

    constructor(
        private readonly notificationRepository: INotificationRepository
    ) {}

    execute = async (filters: NotificationFiltersDto): Promise<PaginatedNotificationsDto> => {

        return await this.notificationRepository.getNotifications(filters);
    }
}