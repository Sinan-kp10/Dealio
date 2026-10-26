import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client"
import { PaginatedUsersDto, UserListFiltersDto, UserListItemDto } from "../../../application/dto/user-list-item.dto"
import { UserManagementRepository } from "../../../domain/repositories/user-management.repository"
import { userListSelect, UserManagementMapper } from "../../mappers/user-management.mapper"

export class PrismaUserManagementRepository implements UserManagementRepository {

    findById = async (id : string) : Promise<UserListItemDto | null> => {

        const user = await prisma.users.findUnique({
            where : {id},
            select : userListSelect
        })

        return user ? UserManagementMapper.toDto(user) : null
    }

    findUsers = async(filters: UserListFiltersDto): Promise<PaginatedUsersDto> => {

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
}