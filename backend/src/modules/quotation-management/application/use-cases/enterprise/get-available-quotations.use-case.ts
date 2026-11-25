import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseQuotationRepository } from "../../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { GetAvailableQuotationsDto, PaginatedAvailableQuotationsDto } from "../../dto/enterprise/enterprise-available-quotation-list.dto";

export class GetAvailableQuotationsUseCase implements IUseCase<GetAvailableQuotationsDto, PaginatedAvailableQuotationsDto> {
  constructor(
    private readonly enterpriseQuotationRepository: IEnterpriseQuotationRepository
  ) {}

  execute = async (input: GetAvailableQuotationsDto): Promise<PaginatedAvailableQuotationsDto> => {
    const enterpriseId = await this.enterpriseQuotationRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    return await this.enterpriseQuotationRepository.findAvailableQuotations(enterpriseId, input.filter);
  };
}
