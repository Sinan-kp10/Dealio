import { IUseCase } from "../../../../../shared/application/base.usecase";
import { CreateQuotationRequestDto } from "../../dto/customer/quotation-request.dto";
import { IQuotationRequestRepository } from "../../../domain/repositories/customer/quotation.request.repository";
import { INotificationService } from "../../../../../shared/interfaces/INotificationService";

export class CreateQuotationRequestUseCase implements IUseCase<CreateQuotationRequestDto, void> {
    constructor(
        private readonly quotationRequestRepository: IQuotationRequestRepository,
        private readonly notificationService: INotificationService
    ) {}

    execute = async (input: CreateQuotationRequestDto): Promise<void> => {
        const userIds = await this.quotationRequestRepository.createQuatationRequest(input);

        if (userIds.length > 0) {
            await Promise.allSettled(
                userIds.map((userId) =>
                    this.notificationService.send({
                        userId,
                        type: "QUOTATION_RECEIVED",
                        title: "New quotation request is available",
                        message: `Review the request for "${input.productName}" and submit your proposal.`,
                    })
                )
            );
        }
    };
}
