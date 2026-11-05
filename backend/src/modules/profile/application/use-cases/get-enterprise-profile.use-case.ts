import { IUseCase } from "../../../../shared/application/base.usecase";
import { NotFoundError } from "../../../../shared/errors/app-error";
import { IEnterpriseProfileRepository } from "../../domain/repositories/enterprise-profile.repository";
import { EnterpriseProfileDto } from "../dto/enterprise-profile.dto";

export class  GetEnterpriseProfileUseCase implements IUseCase<string, EnterpriseProfileDto> {

    constructor(
            private readonly enterpriseProfileRepository: IEnterpriseProfileRepository
        ) {}

    execute = async (userId : string): Promise<EnterpriseProfileDto> => {
        
        const profile = await this.enterpriseProfileRepository.findEnterpriseProfile(userId)

        if(!profile){
            throw new NotFoundError("Enterprise profile not found")
        }

        return profile
    }
}