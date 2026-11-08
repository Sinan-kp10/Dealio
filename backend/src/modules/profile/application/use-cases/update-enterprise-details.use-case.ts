import { IUseCase } from "../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../shared/errors/app-error";
import { IEnterpriseProfileRepository } from "../../domain/repositories/enterprise-profile.repository";
import { UpdatedEnterpriseDetailsDto, UpdateEnterpriseDetailsDto } from "../dto/enterprise-profile.dto";

export class UpdateEnterpriseDetailsUseCase implements IUseCase<UpdateEnterpriseDetailsDto, UpdatedEnterpriseDetailsDto> {

    constructor(
        private readonly enterpriseRepository : IEnterpriseProfileRepository
    ){}

    execute = async (input: UpdateEnterpriseDetailsDto): Promise<UpdatedEnterpriseDetailsDto> => {
        const { userId, ...data } = input;
        
        const user = await this.enterpriseRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("Account not found.");
        }

        return await this.enterpriseRepository.updateEnterpriseDetails(userId, user.enterpriseId, data);
    }
}