import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseAcceptedRequestRepository } from "../../../domain/repositories/enterprise/enterprise-accepted-request.repository";
import {GetEnterpriseAcceptedRequestsDto,PaginatedEnterpriseAcceptedRequestsDto} from "../../dto/enterprise/enterprise-accepted-request-list.dto";

export class GetAcceptedRequestsUseCase implements IUseCase<GetEnterpriseAcceptedRequestsDto, PaginatedEnterpriseAcceptedRequestsDto>{
  constructor(
    private readonly enterpriseAcceptedRequestRepository: IEnterpriseAcceptedRequestRepository
  ) {}

  execute = async (input: GetEnterpriseAcceptedRequestsDto): Promise<PaginatedEnterpriseAcceptedRequestsDto> => {
    const enterpriseId = await this.enterpriseAcceptedRequestRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    return await this.enterpriseAcceptedRequestRepository.findAcceptedRequests(enterpriseId,input.filter);
  };
}
