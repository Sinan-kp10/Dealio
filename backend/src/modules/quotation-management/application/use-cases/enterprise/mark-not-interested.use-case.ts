import { IUseCase } from "../../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { IEnterpriseQuotationRepository } from "../../../domain/repositories/enterprise/enterprise-quotation.repository.dto";
import { MarkNotInterestedDto } from "../../dto/enterprise/enterprise-available-quotation-list.dto";

export class MarkNotInterestedUseCase implements IUseCase<MarkNotInterestedDto, void> {
  constructor(
    private readonly enterpriseQuotationRepository: IEnterpriseQuotationRepository
  ) {}

  execute = async (input: MarkNotInterestedDto): Promise<void> => {
    const enterpriseId = await this.enterpriseQuotationRepository.findEnterpriseIdByUserId(input.userId);
    if (!enterpriseId) {
      throw new NotFoundError("Enterprise not found");
    }
    await this.enterpriseQuotationRepository.markNotInterested(enterpriseId,input.quotationId);
  };
}
