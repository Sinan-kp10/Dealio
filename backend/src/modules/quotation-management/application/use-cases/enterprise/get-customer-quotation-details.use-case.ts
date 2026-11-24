import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseQuotationRepository } from "../../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { CustomerQuotationDetailsDto, GetCustomerQuotationDetailsDto } from "../../dto/enterprise/customer-quotation-details.dto";

export class GetCustomerQuotationDetailsUseCase implements IUseCase<GetCustomerQuotationDetailsDto, CustomerQuotationDetailsDto> {
  constructor(
    private readonly enterpriseQuotationRepository: IEnterpriseQuotationRepository
  ) {}

  execute = async (input: GetCustomerQuotationDetailsDto): Promise<CustomerQuotationDetailsDto> => {
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
