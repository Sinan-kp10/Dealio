import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseQuotationRepository } from "../../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { GetEnterpriseQuotationsDto, PaginatedQuotationDto } from "../../dto/enterprise/enterprise-quotation-list.dto";

export class GetAvailableQuotationsUseCase implements IUseCase<GetEnterpriseQuotationsDto, PaginatedQuotationDto> {
  constructor(
    private readonly enterpriseQuotationRepository: IEnterpriseQuotationRepository
  ) {}

  execute = async (input: GetEnterpriseQuotationsDto): Promise<PaginatedQuotationDto> => {
    const enterpriseId = await this.enterpriseQuotationRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    return await this.enterpriseQuotationRepository.findAvailableQuotations(enterpriseId,input.filter);
  };
}
