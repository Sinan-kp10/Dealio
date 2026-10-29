import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";
import { CustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../../../application/dto/customer-profile.dto";
import { CustomerProfileRepository } from "../../../domain/customer-profile.repository";
import { CustomerProfileMapper, customerProfileSelect } from "../../mapper/customer-profile.mapper";

export class PrismaCustomerProfileRepository implements CustomerProfileRepository {

    findById = async (id: string): Promise<CustomerProfileDto | null> => {
        
        const user = await prisma.users.findUnique({
            where : {
                id : id,
                role : "CUSTOMER"
            },
            select : customerProfileSelect
        })

        return user ? CustomerProfileMapper.toDto(user) : null   
    }

    findCustomerProfile = async (userId: string): Promise<CustomerProfileDto | null> => {
        
        const user = await prisma.users.findFirst({
            where : {
                id : userId,
                role : "CUSTOMER"
            }, select : customerProfileSelect
        })

        return user ? CustomerProfileMapper.toDto(user) : null
    }

    editCustomerProfile = async (userId: string, data: UpdatedCustomerProfileFieldsDto): Promise<UpdatedCustomerProfileFieldsDto> => {
        await prisma.users.update({
            where: { id: userId },
            data,
        });

        return data;
    };

}
