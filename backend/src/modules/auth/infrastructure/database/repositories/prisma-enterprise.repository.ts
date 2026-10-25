import { CreatedEnterpriseResult, CreateEnterpriseData, EnterpriseRepository } from "../../../domain/repositories/enterprise.repository";
import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";

export class PrismaEnterpriseRepository implements EnterpriseRepository {

    findUserByEmail= async(email: string): Promise<boolean> => {
        const user = await prisma.users.findUnique({
            where : {email},
            select : {id : true}
        })

        return user !== null
    }
    create = async (data: CreateEnterpriseData): Promise<CreatedEnterpriseResult> => {
        
        return prisma.$transaction(async (tx)=>{
            const enterprise = await tx.enterprises.create({
                data : {
                    enterprise_name : data.companyName
                }
            })

            const user = await tx.users.create({
                data : {
                    name : data.contactPersonName,
                    email : data.email,
                    phone : data.phone,
                    password_hash : data.passwordHash,
                    role : data.role,
                    enterprise_id : enterprise.id,
                    email_verified: true,
                }
            })

            return{
                enterprise: {
                    id: enterprise.id,
                    name: enterprise.enterprise_name,
                },
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    role : user.role
                },
            }
        })
    }
}