import { IUseCase } from "../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../shared/errors/app-error";
import { IEnterpriseProfileRepository } from "../../domain/repositories/enterprise-profile.repository";
import { EnterpriseProfileDto, UpdateEnterpriseDetailsDto } from "../dto/enterprise-profile.dto";

export class UpdateEnterpriseDetailsUseCase implements IUseCase<UpdateEnterpriseDetailsDto, EnterpriseProfileDto> {

    constructor(
        private readonly enterpriseRepository : IEnterpriseProfileRepository
    ){}

    execute = async (input: UpdateEnterpriseDetailsDto): Promise<EnterpriseProfileDto> => {
        const { userId, ...data } = input;
        
        const user = await this.enterpriseRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("Account not found.");
        }

        return await this.enterpriseRepository.updateEnterpriseDetails(userId, user.enterpriseId, data)
    }
}