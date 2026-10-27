import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client"
import { CustomerListFiltersDto, CustomerListItemDto, PaginatedUsersDto,} from "../../../application/dto/user-list-item.dto"
import { CustomerManagementRepository } from "../../../domain/repositories/customer-management.repository"
import { userListSelect, UserManagementMapper } from "../../mappers/user-management.mapper"

export class PrismaCustomerManagementRepository implements CustomerManagementRepository {

    findById = async (id : string) : Promise<CustomerListItemDto | null> => {

        const user = await prisma.users.findUnique({
            where : {id},
            select : userListSelect
        })

        return user ? UserManagementMapper.toDto(user) : null
    }

    findUsers = async(filters: CustomerListFiltersDto): Promise<PaginatedUsersDto> => {

        const DEFAULT_LIMIT = 5;

        const {search, status, page, limit } = filters
        const searchTerm = search?.trim()

        const where = {
            role: "CUSTOMER" as const,
            ...(status ? {status} : {}),
            ...(searchTerm ? {
                OR : [
                    {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        email: {
                            contains: searchTerm,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        phone: {
                            contains: searchTerm,
                            mode: "insensitive" as const,
                        },
                    },
                ]
                
            }: {})
        }

        const [users, total] = await Promise.all([
            prisma.users.findMany({
                where,
                skip: (page - 1) * (limit || DEFAULT_LIMIT),
                take: limit,
                orderBy: { created_at: "desc" },
                select: userListSelect,
            }),
            prisma.users.count({ where }),
        ]);

        return {
            items : users.map(UserManagementMapper.toDto),
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }

    suspendAccount= async(accountId: string, reason: string): Promise<void> =>{

        await prisma.users.update({
            where : {id : accountId},
            data : {
                status : "SUSPENDED",
                suspended_at : new Date(),
                suspension_reason: reason,
            }
        })

    }

    reactivateAccount = async (accountId: string): Promise<void> => {

        await prisma.users.update({
            where : {id : accountId},
            data : {
                status : "ACTIVE",
                suspended_at : null,
                suspension_reason: null,
            }
        })
        
    }
}