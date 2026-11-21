import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseQuotationRepository } from "../../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { EnterpriseQuotationDetailsDto, GetEnterpriseQuotationDetailsDto } from "../../dto/enterprise/enterprise-quotation-details.dto";

export class GetEnterpriseQuotationDetailsUseCase implements IUseCase<GetEnterpriseQuotationDetailsDto, EnterpriseQuotationDetailsDto> {
  constructor(
    private readonly enterpriseQuotationRepository: IEnterpriseQuotationRepository
  ) {}

  execute = async (input: GetEnterpriseQuotationDetailsDto): Promise<EnterpriseQuotationDetailsDto> => {
    const enterpriseId = await this.enterpriseQuotationRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }

    const quotation = await this.enterpriseQuotationRepository.findQuotationDetails(enterpriseId, input.quotationId);
    if (!quotation) {
      throw new NotFoundError("Quotation not found");
    }

    return quotation;
  };
}
